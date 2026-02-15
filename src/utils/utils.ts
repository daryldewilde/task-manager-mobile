import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key:string, value:string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error('Error storing data:', error);
    }
}

const getData = async (key:string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
}

const removeData = async (key:string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing data:', error);
    }
}

export { storeData, getData, removeData };