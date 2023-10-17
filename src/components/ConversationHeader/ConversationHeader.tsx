import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const ConversationHeader = ({ route }: any) => {
    const user = route.params?.user;

    return (
        <View style={tw`flex flex-row `}>

            <View>
                <Text>{user?.full_name}</Text>
            </View>
        </View>
    )
}

export default ConversationHeader