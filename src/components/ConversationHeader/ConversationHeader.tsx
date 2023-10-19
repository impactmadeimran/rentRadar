import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import noUser from '../../assets/noUser.png'
import _ from 'lodash';


const ConversationHeader = ({ route, navigation }: any) => {
    const user = route.params?.params;
    // console.log('route', user)

    return (
        <SafeAreaView style={tw`flex items-center bg-gray-50 border-b border-gray-200 -pb-5 `}>
            <TouchableOpacity style={tw`absolute left-1 top-14`} onPress={() => navigation.goBack()}>
                <ChevronLeft size={40} />
            </TouchableOpacity>
            <Image source={!_.isEmpty(user?.profile_image) ? { uri: user?.profile_image } : noUser} style={tw`w-10 h-10 rounded-full flex `} />
            <View>
                <Text style={tw`text-lg `}>{user?.fullname}</Text>
            </View>

        </SafeAreaView>
    )
}

export default ConversationHeader