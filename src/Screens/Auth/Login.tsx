import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import tw from 'twrnc'

const Login = ({ navigation }: any) => {
    return (
        <SafeAreaView style={tw`flex flex-1 items-center justify-center w-full `}>
            <View style={tw`  w-full px-5 `}>
                <View style={tw`px-6 bg-slate-50 py-10 rounded-lg`}>
                    <Text style={tw`text-center text-2xl font-semibold`}>Welcome back!</Text>
                    <Text style={tw`text-center text-gray-500 text-sm `}>Login to your existing account</Text>
                    <View style={tw`w-full mt-7 flex gap-4`}>
                        <TextInput style={tw`border border-gray-200 p-2 rounded`} placeholder="Email" />
                        <TextInput style={tw`border border-gray-200 p-2 rounded`} placeholder="Password" />
                        <View style={tw`flex flex-row justify-end`}>
                            <Text style={tw`text-xs font-light`}>Forgot Password?</Text>
                        </View>
                        <TouchableOpacity style={tw`bg-red-500 p-2 rounded`}>
                            <Text style={tw`text-center text-white font-bold`}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tw`mt-10`}>
                        <View style={tw`flex flex-row justify-center`}>
                            <Text style={tw`text-center text-xs`}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={tw`font-semibold`}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView >
    )
}

export default Login