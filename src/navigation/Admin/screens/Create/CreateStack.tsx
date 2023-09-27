import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AuthenticateUser from "../../../../../src/Screens/Admin/Account/AuthenticateUser/AuthenticateUser";
import AddItems from "../../../../../src/Screens/Admin/Create/components/AddItems"
import { useUserContext } from "../../../../../src/context/UserContext";

const Stack = createNativeStackNavigator()

const CreateStack = () => {
    const { token } = useUserContext();
    if (token === undefined) return <Stack.Navigator>
        <Stack.Screen name='AuthenticateUser' component={AuthenticateUser} options={{ headerShown: false }} />
    </Stack.Navigator>
    return (
        <Stack.Navigator initialRouteName='Create'>
            <Stack.Screen name="Create" component={AddItems} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default CreateStack