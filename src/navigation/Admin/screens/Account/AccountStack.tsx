import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountInfo from '../../../../Screens/Admin/Account/AccountInfo/AccountInfo'
import { useUserContext } from '../../../../context/UserContext'
import AuthenticateUser from '../../../../Screens/Admin/Account/AuthenticateUser/AuthenticateUser'
import Profile from '../../../../Screens/Admin/Account/AccountInfo/components/Profile/Profile'

const Stack = createNativeStackNavigator()
const AccountStack = () => {
    // const { token } = useUserContext();

    // if (token === undefined) return <Stack.Navigator>
    //     <Stack.Screen name='AuthenticateUser' component={AuthenticateUser} options={{ headerShown: false }} />
    // </Stack.Navigator>
    return (
        <Stack.Navigator>
            <Stack.Screen name='AuthenticateUser' component={AuthenticateUser} options={{ headerShown: false }} />
            <Stack.Screen name='AccountInfo' component={AccountInfo} options={{ headerTitle: 'Account', headerBackVisible: false }} />
            {/* {token === undefined && <Stack.Screen name='AuthenticateUser' component={AuthenticateUser} options={{ headerShown: false }} />} */}
            {/* <Stack.Group screenOptions={{ presentation: 'modal' }}> */}
            <Stack.Screen name='ViewProfile' component={Profile} options={{ headerBackTitleVisible: false, headerTitle: 'Profile' }} />
            {/* </Stack.Group> */}
        </Stack.Navigator>
    )
}

export default AccountStack
