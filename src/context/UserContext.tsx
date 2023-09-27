import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, createContext, useState, Dispatch, SetStateAction, useEffect } from 'react'

interface userProps {
    token: string | undefined;
    setToken: any,
    authenticate: (data: string) => Promise<void>,
    clearUser: any;
    isAuthenticated: boolean;
    setUserData: any;
    user: any;
}

const Context = createContext<Partial<userProps>>({
    token: undefined
});

export const useUserContext = () => useContext(Context);
const UserContext = ({ children }: any) => {
    const [token, setToken] = useState<any>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<any>(null)

    const authenticate = async (data: string) => {
        try {
            // const jsonUser = JSON.stringify(data);
            await AsyncStorage.setItem('userToken', data)
            setIsAuthenticated(true)
            setToken(data)
        } catch (e) {
            console.log(e)
        }
    }

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            // setToken(token)
            console.log(token)
            // return token
        } catch (e) {
            console.log(e)
        }
    }

    const clearUser = async () => {
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('userToken');
            setIsAuthenticated(false)
        } catch (e) {
            console.log(e)
        }
    }

    const setUserData = async (data: any) => {
        console.log('data', data)
        try {
            const jsonUser = JSON.stringify(data);
            await AsyncStorage.setItem('userData', jsonUser);
            const user = await AsyncStorage.getItem('userData');
            const parsedUser = JSON.parse(user || '{}');
            if (parsedUser) {
                setUser(parsedUser)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Context.Provider
            value={{
                token,
                authenticate,
                clearUser,
                isAuthenticated,
                setUserData,
                user
            }}
        >
            {children}

        </Context.Provider>
    )
}

export default UserContext