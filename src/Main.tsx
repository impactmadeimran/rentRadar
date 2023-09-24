import { View, StyleSheet } from 'react-native'
import React from 'react'
import Auth from './navigation/Auth/Auth'
import { StatusBar } from 'expo-status-bar'
import Admin from './navigation/Admin/Admin'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import axios from 'axios'


axios.defaults.baseURL = "http://206.81.18.243:5555/api/v1"
const Stack = createNativeStackNavigator();
const Main = () => {

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='App' screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen name="Auth" component={Auth} />
                    </Stack.Group>
                    <Stack.Screen name="App" component={Admin} />
                </Stack.Navigator>
            </NavigationContainer>

            <StatusBar style="auto" />
        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});