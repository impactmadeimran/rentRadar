import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AllItems from '../../../../Screens/Admin/Home/components/All/AllItems'
import ViewItem from '../../../../Screens/Admin/Home/components/ViewItem/ViewItem'
import ViewItemImage from '../../../../Screens/Admin/Home/components/ViewItemImage/ViewItemImage'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='All'>
      <Stack.Screen name="All" component={AllItems} options={{
        header: () =>
          <SafeAreaView style={tw`flex bg-gray-50 border-b border-gray-200 -pb-3 px-4 `}>
            <Text style={[tw`text-4xl text-red-700`, styles.header]}>RentRadar</Text>
          </SafeAreaView>
      }} />
      <Stack.Screen name="Viewitem" component={ViewItem} options={{ headerShown: false }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Viewimage" component={ViewItemImage} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({
  header: {
    fontFamily: 'GrandHotel',
    // color: '#F59E0B',
  }
})
