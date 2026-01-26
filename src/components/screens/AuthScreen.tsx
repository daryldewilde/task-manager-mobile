import { Text, View, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { AuthTabType } from "../../types/types";
import { useMutation } from "@tanstack/react-query";
import  {loginUser, signUpUser} from "../../api/api";
import {useForm, Controller} from "react-hook-form";




const AuthTabs = () => {
    const {control, handleSubmit} = useForm();
    const DEFAULT_ACTIVE_TAB: AuthTabType = AuthTabType.Login;
    const [activeTab, setActiveTab] = useState<AuthTabType>(DEFAULT_ACTIVE_TAB);

    // Set up mutations for API calls
    const loginMutation = useMutation({
        mutationFn: (data: { email: string; password: string }) => 
            loginUser(data.email, data.password),
        onSuccess: (data) => {
            console.log('Login successful:', data);
            // TODO: Navigate to home screen or store token
        },
        onError: (error) => {
            console.error('Login failed:', error);
            // TODO: Show error message to user
        }
    });

    const signupMutation = useMutation({
        mutationFn: (data: { username: string; email: string; password: string }) => {
            console.log(data)
            return signUpUser(data.username, data.email, data.password)
        },
        onSuccess: (data) => {
            console.log('Signup successful:', data);
            // TODO: Navigate to home screen or store token
        },
        onError: (error: any) => {
            console.error('Signup failed:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
            // TODO: Show error message to user
        }
    });

    // Handle form submissions
    const handleLogin = handleSubmit((data) => {
        console.log('LOGIN - Form data being sent:', data);
        loginMutation.mutate(data as { email: string; password: string });
    });

    const handleSignup = handleSubmit((data) => {
        console.log('SIGNUP - Form data being sent:', data);
        signupMutation.mutate(data as { username: string; email: string; password: string });
    });

    return (
        <View  style={styles.authTabs}>
            <View style={styles.tabHeaders}>
                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === AuthTabType.Login && styles.activeTab]}
                    onPress={() => setActiveTab(AuthTabType.Login)}
                >
                    <Text style={[styles.tabText, activeTab === AuthTabType.Login && styles.activeTabText]}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === AuthTabType.SignUp && styles.activeTab]}
                    onPress={() => setActiveTab(AuthTabType.SignUp)}
                >
                    <Text style={[styles.tabText, activeTab === AuthTabType.SignUp && styles.activeTabText]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            {
                activeTab === AuthTabType.Login ? (
                    <View style={styles.formContainer}>
                        <Controller
                            control={control}
                            name="email"
                            rules={{ required: 'Email is required' }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput 
                                    placeholder="Email" 
                                    style={styles.input}
                                    placeholderTextColor="#999"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: 'Password is required' }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput 
                                    placeholder="Password" 
                                    secureTextEntry={true}
                                    style={styles.input}
                                    placeholderTextColor="#999"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <TouchableOpacity 
                            style={styles.submitButton} 
                            onPress={handleLogin}
                            disabled={loginMutation.isPending}
                        >
                            <Text style={styles.submitButtonText}>
                                {loginMutation.isPending ? 'Logging in...' : 'Login'}
                            </Text>
                        </TouchableOpacity> 
                        <TouchableOpacity>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.formContainer}>
                        <Controller
                            control={control}
                            name="username"
                            rules={{ required: 'Username is required' }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput 
                                    placeholder="Username" 
                                    style={styles.input}
                                    placeholderTextColor="#999"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    autoCapitalize="none"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="email"
                            rules={{ required: 'Email is required' }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput 
                                    placeholder="Email" 
                                    style={styles.input}
                                    placeholderTextColor="#999"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: 'Password is required' }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput 
                                    placeholder="Password" 
                                    secureTextEntry={true}
                                    style={styles.input}
                                    placeholderTextColor="#999"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <TouchableOpacity 
                            style={styles.submitButton} 
                            onPress={handleSignup}
                            disabled={signupMutation.isPending}
                        >
                            <Text style={styles.submitButtonText}>
                                {signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
                            </Text>
                        </TouchableOpacity> 
                    </View>
                )
            }
        </View>
    );
}

function AuthScreen() {
    return (
        <View  style={styles.container}> 
            <AuthTabs />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e3f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    authTabs: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: 320,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    tabHeaders: {
        flexDirection: 'row',
        backgroundColor: '#4a7bc2',
        borderRadius: 8,
        marginBottom: 24,
        overflow: 'hidden',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: '#5c8dd6',
    },
    activeTab: {
        backgroundColor: '#4a7bc2',
    },
    tabText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
    },
    activeTabText: {
        fontWeight: '600',
    },
    formContainer: {
        gap: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 14,
        backgroundColor: 'white',
    },
    submitButton: {
        backgroundColor: '#4a7bc2',
        paddingVertical: 14,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 8,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    forgotPassword: {
        color: '#4a7bc2',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
    },
});

export default AuthScreen;