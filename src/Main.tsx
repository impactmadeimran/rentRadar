import { View, StyleSheet } from 'react-native'
import React from 'react'
import Auth from './navigation/Auth/Auth'
import { StatusBar } from 'expo-status-bar'
import Admin from './navigation/Admin/Admin'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import axios from 'axios'
import Conversation from './Screens/Admin/Message/components/Conversation/Conversation'
import ConversationHeader from './components/ConversationHeader/ConversationHeader'

import { useFonts } from 'expo-font';


axios.defaults.baseURL = "http://206.81.18.243:5555/api/v1"
const Stack = createNativeStackNavigator();
const Main = () => {
    const [fontsLoaded] = useFonts({
        'GrandHotel': require('../assets/fonts/GrandHotel-Regular.ttf')
    });


    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='App'
                // screenOptions={{
                //     headerShown: false
                // }}
                >
                    <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }} >
                        <Stack.Screen name="Auth" component={Auth} />
                    </Stack.Group>
                    <Stack.Screen name="App" component={Admin} options={{ headerShown: false }} />
                    <Stack.Screen name="Conversation" component={Conversation}
                        options={({ route, navigation }) => ({
                            header: () => <ConversationHeader route={route} navigation={navigation} />,
                            // headerTitle: () => <ConversationHeader route={route} />,
                            headerBackVisible: true
                        })} />
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