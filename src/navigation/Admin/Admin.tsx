import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../Screens/Admin/Home/Home";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Message from "../../Screens/Admin/Message/Message";
import Account from "../../Screens/Admin/Account/Account";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";
import Explore from "../../Screens/Admin/Explore/Explore";

const Tab = createBottomTabNavigator();


const Admin = () => {
    const { token } = useUserContext()
    axios.interceptors.request.use(
        function (config) {
            // Do something before request is sent
            if (token !== undefined) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );
    return (
        <Tab.Navigator
            screenOptions={() => ({
                tabBarActiveTintColor: 'red',
                headerShown: false,
                tabBarStyle: {
                    // height: 0
                }
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color }) => {
                    return <AntDesign name={'home'} size={20} color={color} />;
                }
            }} />
            <Tab.Screen name="Explore" component={Explore} options={{
                tabBarIcon: ({ color }) => {
                    return <AntDesign name={'search1'} size={20} color={color} />;
                }
            }} />
            <Tab.Screen name="Favorites" component={Message} options={{
                tabBarIcon: ({ color }) => {
                    return <AntDesign name={'hearto'} size={20} color={color} />;
                }
            }} />
            <Tab.Screen name="Message" component={Message} options={{
                tabBarIcon: ({ color }) => {
                    return <AntDesign name={'message1'} size={20} color={color} />;
                }
            }} />
            <Tab.Screen name="Account" component={Account} options={{
                tabBarIcon: ({ color }) => {
                    return <AntDesign name={'user'} size={20} color={color} />;
                }
            }} />
        </Tab.Navigator>
    )
}

export default Admin