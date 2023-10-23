import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, createContext, useState } from 'react'

interface userProps {
    token: string | undefined;
    setToken: any,
    authenticate: (data: string) => Promise<void>,
    clearUser: any;
    isAuthenticated: boolean;
    setUserData: any;
    user: any;
    tokenDecoded: any;
    logout: any
}

const Context = createContext<Partial<userProps>>({
    token: undefined
});

export const useUserContext = () => useContext(Context);
const UserContext = ({ children }: any) => {
    const [token, setToken] = useState<any>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [tokenDecoded, setTokenDecoded] = useState<any>(null)

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

    // const getToken = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('userToken');
    //         // setToken(token)
    //         console.log(token)
    //         // return token
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            setIsAuthenticated(false)
        } catch (e) {
            console.log(e)
        }
    }

    const clearUser = async () => {
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('userToken');
            setToken(undefined)
            setTokenDecoded(null)
            setUser(null)
            setIsAuthenticated(false)
        } catch (e) {
            console.log(e)
        }
    }

    const setUserData = async (data: any, jwt: any) => {
        console.log('data', data)
        try {
            const jsonUser = JSON.stringify(data);
            const jsonToken = JSON.stringify(jwt);
            await AsyncStorage.setItem('jsonToken', jsonToken);
            await AsyncStorage.setItem('userData', jsonUser);
            const user = await AsyncStorage.getItem('userData');
            const token = await AsyncStorage.getItem('jsonToken');
            const parsedUser = JSON.parse(user || '{}');
            const parsedToken = JSON.parse(token || '{}');
            if (parsedUser && parsedToken) {
                console.log('decoded successfully')
                setUser(parsedUser)
                setTokenDecoded(parsedToken)

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
                user,
                tokenDecoded,
                logout
            }}
        >
            {children}

        </Context.Provider>
    )
}

export default UserContext