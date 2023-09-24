import { View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'
import { ChevronRight } from 'lucide-react-native'

const AccountInfo = ({ navigation }: any) => {



    const routes = [
        {
            name: 'Profile',
            route: 'ViewProfile'
        },
        {
            name: 'Profile',
            route: 'profile'
        },
        {
            name: 'Profile',
            route: 'profile'
        },
        {
            name: 'Profile',
            route: 'profile'
        },
        {
            name: 'Profile',
            route: 'profile'
        },
    ]

    // useEffect(() => {
    //     Keyboard.dismiss()
    // }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <View style={tw`p-4 flex-1`}>
                <View style={tw`bg-white py-3 px-2 rounded-lg`}>
                    {
                        routes.map((route, index) => (
                            <TouchableOpacity key={index} style={[tw`py-4 px-2 flex flex-row justify-between items-center`, index >= 1 && { borderTopColor: 'gray', borderTopWidth: 0.2 }]} onPress={() => navigation.navigate(route.route)}>
                                <Text style={tw`text-lg`}>{route?.name}</Text>
                                <ChevronRight color='black' size={24} />
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default AccountInfo