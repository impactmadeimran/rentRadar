import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../context/UserContext'

// const { setToken } = useUserContext()
export const authenticate = async (data: any) => {
    try {
        // const jsonUser = JSON.stringify(data);
        await AsyncStorage.setItem('userToken', data)
    } catch (e) {
        console.log(e)
    }
}

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
    } catch (e) {
        console.log(e)
    }
}

export const clearUser = async () => {
    try {
        await AsyncStorage.removeItem('user');
    } catch (e) {
        console.log(e)
    }
}