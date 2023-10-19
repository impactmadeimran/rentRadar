import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'

const AuthenticateUser = ({ navigation }: any) => {
    return (
        <SafeAreaView style={tw`p-4 flex flex-1 items-center justify-center`}>
            <View style={tw``}>
                <Text style={tw`text-lg text-center`}>You have to sign in before you can access your profile.</Text>
                <TouchableOpacity style={tw`bg-red-500  rounded-lg mt-10`} onPress={() => navigation.navigate('Auth')}>
                    <Text style={tw`text-white text-lg text-center font-extrabold py-2`}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AuthenticateUser