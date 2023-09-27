import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { ChevronRight, PenSquareIcon, StarIcon, User2Icon } from 'lucide-react-native'

const AccountInfo = ({ navigation }: any) => {

    const routes = [
        {
            name: 'Profile',
            route: 'ViewProfile',
            icon: User2Icon
        },
        {
            name: 'Posts',
            route: 'MyPosts',
            icon: PenSquareIcon
        },
        {
            name: 'Favorites',
            route: 'profile',
            icon: StarIcon
        },
    ]

    return (
        <ScrollView style={tw`flex-1 bg-gray-50`} keyboardDismissMode='on-drag' keyboardShouldPersistTaps='handled' accessible={false}>

            <View style={tw`p-4 flex-1`}>
                <View style={tw` py-3 px-2 `}>
                    {
                        routes.map((route, index) => (
                            <TouchableOpacity key={index} style={[tw`py-4 px-2 flex flex-row gap-2`, index >= 1 && { borderTopColor: 'gray', borderTopWidth: 0.2 }]} onPress={() => navigation.navigate(route.route)}>
                                {route?.icon && <route.icon size={24} color='black' />}
                                <View style={tw`flex flex-row w-full justify-between`}>
                                    <Text style={tw`text-lg`}>{route?.name}</Text>
                                    <ChevronRight style={tw`mr-8`} color='black' size={24} />
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <TouchableOpacity style={tw`bg-red-500  rounded-lg mt-10`}>
                    <Text style={tw`text-white text-lg text-center font-extrabold py-3`}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default AccountInfo