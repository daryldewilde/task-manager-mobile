import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

function HomeScreen() {
  return (
    <View  style={styles.container}>
        <Text>My first  react  native app</Text>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#379fb7',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;