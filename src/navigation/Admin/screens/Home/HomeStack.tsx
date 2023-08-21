import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AllItems from '../../../../Screens/Admin/Home/components/All/AllItems'
import ViewItem from '../../../../Screens/Admin/Home/components/ViewItem/ViewItem'
import ViewItemImage from '../../../../Screens/Admin/Home/components/ViewItemImage/ViewItemImage'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='All'>
      <Stack.Screen name="All" component={AllItems} options={{ headerShown: false }} />
      <Stack.Screen name="Viewitem" component={ViewItem} options={{ headerShown: false }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Viewimage" component={ViewItemImage} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default HomeStack
