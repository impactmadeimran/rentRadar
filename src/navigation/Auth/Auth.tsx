import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../Screens/Auth/Login';
import Register from '../../Screens/Auth/Register';
const Stack = createNativeStackNavigator();
const Auth = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Register' component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Auth