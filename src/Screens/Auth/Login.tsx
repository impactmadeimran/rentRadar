import { ActivityIndicator, Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import tw from 'twrnc'
import api from "../../../utils"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useUserContext } from "../../context/UserContext"
import Loader from "../../components/Loader/Loader"

const Login = ({ navigation }: any) => {
    const { register, handleSubmit, control } = useForm();
    const { authenticate } = useUserContext()
    const login = async (data: any) => {
        const res = await api.post('auth/login/', {
            ...data
        })
        return res.data
    }

    const { mutate, isLoading } = useMutation({
        mutationKey: ['login'],
        mutationFn: login,
        onSuccess: (data) => {
            if (data?.jwt) {
                authenticate?.(data?.jwt)
                navigation.navigate('App')
            } else {
                Alert.alert('Error')
            }
        }
    })

    const onSubmit = (data: any) => {
        console.log(data)
        mutate(data)

    }

    if (isLoading) return <Loader />

    return (
        <SafeAreaView style={tw`flex flex-1 items-center justify-center w-full `}>
            <View style={tw`  w-full px-5 `}>
                <View style={tw`px-6 bg-slate-50 py-10 rounded-lg`}>
                    <Text style={tw`text-center text-2xl font-semibold`}>Welcome back!</Text>
                    <Text style={tw`text-center text-gray-500 text-sm `}>Login to your existing account</Text>
                    <View style={tw`w-full mt-7 flex gap-4`}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput style={tw`border border-gray-200 p-2 rounded`} placeholder="Email" onChangeText={onChange} onBlur={onBlur} value={value} autoCapitalize={'none'} />
                            )}

                            name="email"
                        />
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput {...register('password', { required: true })} style={tw`border border-gray-200 p-2 rounded`} placeholder="Password" onChangeText={onChange} onBlur={onBlur} value={value} autoCapitalize={'none'} secureTextEntry={true} />
                            )}

                            name="password"
                        />
                        <View style={tw`flex flex-row justify-end`}>
                            <Text style={tw`text-xs font-light`}>Forgot Password?</Text>
                        </View>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={tw`bg-red-500 p-2 rounded`}>
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