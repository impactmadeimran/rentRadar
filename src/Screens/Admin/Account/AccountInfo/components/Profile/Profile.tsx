import { Image, Text, View } from 'react-native'
import React from 'react'
import api from '../../../../../../../utils'
import { useQuery } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import emptyUser from 'src/assets/noUser.png'
import { Pen } from 'lucide-react-native'

const Profile = () => {
    const fetchUser = async () => {
        const res = await api.get('/user/')
        return res.data
    }

    const { data } = useQuery({
        queryFn: fetchUser,
        queryKey: ['user_data']
    })

    console.log(data)
    return (
        <SafeAreaView style={tw`p-4`}>
            <View style={tw`flex items-center mb-5`}>
                <Image source={data?.profile_image === null ? emptyUser : { uri: data?.profile_image }} style={tw`w-40 h-40 rounded-full`} />
                <View style={tw` bottom-0 ml-12 -mt-5 bg-red-500 p-1 rounded-full `}><Pen color='white' size={20} /></View>
            </View>
            <View style={tw`p-3 bg-white rounded-lg flex gap-5`}>
                <View style={tw` flex-row justify-between`}>
                    <Text>Name</Text>
                    <Text>{data?.full_name}</Text>
                </View>
                <View style={tw` flex-row justify-between`}>
                    <Text>Email</Text>
                    <Text>{data?.email}</Text>
                </View>
                <View style={tw` flex-row justify-between`}>
                    <Text>Business name</Text>
                    <Text>{data?.bus_name ?? "Not Specified"}</Text>
                </View>
                <View style={tw` flex-row justify-between`}>
                    <Text>Phone Number</Text>
                    <Text>{data?.phone}</Text>
                </View>
                <View style={tw` flex-row justify-between`}>
                    <Text>Location</Text>
                    <Text>{data?.location}</Text>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Profile

