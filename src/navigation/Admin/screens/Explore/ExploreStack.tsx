import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../../../../Screens/Admin/Explore/components/Search'

const Stack = createNativeStackNavigator()

const ExploreStack = () => {
    return (
        <Stack.Navigator initialRouteName='Search'>
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default ExploreStack