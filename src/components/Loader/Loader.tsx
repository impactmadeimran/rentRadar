import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const Loader = () => {
    return (
        <View style={tw`h-full w-full items-center justify-center flex flex-1`}><ActivityIndicator size="large" /></View>
    )
}

export default Loader