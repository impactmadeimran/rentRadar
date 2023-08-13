import { Text, TextInput, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const Search = () => {
    return (
        <View style={tw`py-2 flex-1`}>
            <TextInput style={tw`border-0 py-2  `} placeholder='Search item' />
        </View>
    )
}

export default Search