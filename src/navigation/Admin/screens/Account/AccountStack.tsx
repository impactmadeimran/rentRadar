import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountInfo from '../../../../Screens/Admin/Account/AccountInfo/AccountInfo'
import { useUserContext } from '../../../../context/UserContext'
import AuthenticateUser from '../../../../Screens/Admin/Account/AuthenticateUser/AuthenticateUser'
import Profile from '../../../../Screens/Admin/Account/AccountInfo/components/Profile/Profile'
import Posts from '../../../../Screens/Admin/Account/AccountInfo/components/Posts/Posts'
import Favorites from '../../../../Screens/Admin/Account/AccountInfo/components/Favorites/Favorites'
import ViewItem from '../../../../Screens/Admin/Home/components/ViewItem/ViewItem'
import KYC from '../../../../Screens/Admin/Account/AccountInfo/components/KYC/KYC'

const Stack = createNativeStackNavigator()
const AccountStack = () => {
    const { token } = useUserContext();
    console.log(token)
    if (token === undefined) return <Stack.Navigator>
        <Stack.Screen name='AuthenticateUser' component={AuthenticateUser} options={{ headerShown: false }} />
    </Stack.Navigator>
    return (
        <Stack.Navigator>
            <Stack.Screen name='AccountInfo' component={AccountInfo} options={{ headerTitle: 'Account', headerBackVisible: false }} />
            <Stack.Screen name='ViewProfile' component={Profile} options={{ headerBackTitleVisible: false, headerTitle: 'Edit Profile' }} />
            <Stack.Screen name='KYC' component={KYC} options={{ headerBackTitleVisible: false, headerTitle: 'KYC' }} />
            <Stack.Screen name='MyPosts' component={Posts} options={{ headerBackTitleVisible: false, headerTitle: 'My Posts' }} />
            <Stack.Screen name='MyFavorites' component={Favorites} options={{ headerBackTitleVisible: false, headerTitle: 'My Favorites' }} />
            <Stack.Screen name='ViewItemAccount' component={ViewItem} options={{ headerShown: false }} />
            {/* </Stack.Group> */}
        </Stack.Navigator>
    )
}

export default AccountStack
