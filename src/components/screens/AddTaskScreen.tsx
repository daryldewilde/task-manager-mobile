import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Switch } from "react-native";
import { useState } from "react";
import { useForm , Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMutation } from "@tanstack/react-query";  
import { AddTasks } from "../../api/api";
import { task } from "../../types/types";


const AddTaskScreen = () => {
 const {control, handleSubmit} = useForm()
 const [showDatePicker, setShowDatePicker] = useState(false);
    const {mutate: addTask, isPending} = useMutation({
        mutationFn: async (data:task) => {
            return await AddTasks(data)
        },
        onError: (error) => {
            console.error("Error adding task:", error);
        },
        onSuccess: (data) => {
            console.log("Task added successfully:", data);
        }
    }
    )
    const handleAddTask = handleSubmit((data)=> {
        addTask(data as task)
    })
  return (
        <View style={styles.container}>
            <View style={styles.formContent}>
                <Controller
                name="Title"
                control={control}
                rules={{required:true}}
                render={({field}) => (
                <TextInput 
                    {...field}
                    placeholder="Enter  the  title of  your  task"
                    style={styles.input}
                    onChangeText={field.onChange}
                    placeholderTextColor="#999"
                />)}
            />

            <Controller
                name="Description"
                control={control}
                rules={{required:true}}
                render={({field}) => (
                    <TextInput 
                        placeholder="Description"
                        placeholderTextColor={"#999"}
                        onChangeText={field.onChange}
                        style={styles.input}
                        {...field}
                    />
                )}
            />

            <Controller
                name="due_date"
                control={control}
                rules={{required:true}}
                defaultValue={new Date().toISOString()}
                render={({field: { value, onChange }}) => (
                    <View>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={styles.dateText}>
                                {value ? new Date(value).toDateString() : "Select due date"}
                            </Text>
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={value ? new Date(value) : new Date()}
                                mode="date"
                                display={"default"}
                                onChange={(_, selectedDate) => {
                                    setShowDatePicker(false);
                                    if (selectedDate) {
                                        onChange(selectedDate.toISOString());
                                    }
                                }}
                            />
                        )}
                    </View>
                )}
            />

            <Controller
                name="Completed"
                control={control}
                defaultValue={false}
                render={({field: { value }}) => (
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>Completed</Text>
                        <Switch value={Boolean(value)} disabled />
                    </View>
                )}
            />
            </View>
            
            <TouchableOpacity
                style={styles.submitButton} 
                onPress={handleAddTask}
                disabled={isPending}
            >
                <Text style={styles.submitButtonText}>
                    {isPending ? 'Adding task' : 'Add Task'}
                </Text>
            </TouchableOpacity> 


            <StatusBar  style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    formContent:{
        flex:1,
        width:"80%",
    },
     input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontSize: 14,
        backgroundColor: 'white',
        marginTop: 30,
    },
     submitButton: {
        position: 'absolute',
        bottom: 60,
        backgroundColor: '#4a7bc2',
        borderRadius: 6,
        width:"80%",
        alignItems: 'center',
        padding: 10,
        elevation: 5,
    },
     submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    dateText: {
        fontSize: 14,
        color: '#333',
    },
    switchRow: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
    },
    switchLabel: {
        fontSize: 14,
        color: '#333',
    },

});

export default AddTaskScreen;
