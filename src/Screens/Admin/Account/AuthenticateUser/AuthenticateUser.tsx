import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'

const AuthenticateUser = ({ navigation }: any) => {
    return (
        <SafeAreaView style={tw`p-4 flex flex-1 items-center justify-center`}>
            <View style={tw``}>
                <Text>You have to login before you can access your profile.</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Auth')}>

                    <Text>Click  <Text style={tw`text-blue-600`}>here</Text>  to login.</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AuthenticateUser