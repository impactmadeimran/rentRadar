import { View, Text, Image, TouchableOpacity, Platform, Linking, Alert, ScrollView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { MessageCircleIcon, Phone } from 'lucide-react-native'
import { useUserContext } from '../../../../../../../src/context/UserContext'
import emptyUser from 'src/assets/noUser.png'
import api, { CediFormat } from '../../../../../../../utils'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../../../../../../src/components/Loader/Loader'

const ViewRenter = ({ route, navigation }: any) => {
    const { token } = useUserContext()
    const user = route?.params?.params

    const call = () => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${'233206812111'}`;
        } else {
            phoneNumber = `telprompt:${'233206812111'}`;
        }

        Linking.openURL(phoneNumber);
        // Linking.openURL(`tel:${data?.user?.phone}`)
    }



    const enquire = () => {
        if (!token) {
            Alert.alert('You have to be logged in to continue', 'To continue, press Login', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Login', onPress: () => navigation.navigate('Auth', {
                        screen: 'Login'
                    })
                },
            ]);
        } else {
            navigation.navigate('Conversation', {
                // screen: 'Conversation',
                params: {
                    id: user?.id,
                    fullname: user?.fullname,
                    profile_image: user?.profile_image
                },
            })
        }
    }

    const getUserRentals = async () => {
        const res = await api.get(`/rental/user/${user?.id}`)
        return res.data
    }

    const { data, isLoading } = useQuery({
        queryKey: ['user_rentals'],
        queryFn: getUserRentals,
    })

    if (isLoading) return <Loader />

    return (
        <View style={tw`p-4`}>
            <View style={tw`flex flex-row items-center gap-2`}>
                <Image style={tw`h-16 w-16 rounded-full`} source={!user?.profile_image ? emptyUser : { uri: user?.profile_image }} />
                <View>
                    <Text style={tw`text-2xl font-semibold`}>
                        {user?.business_name}
                    </Text>
                    <Text style={tw`text-xs text-gray-500`}>{data?.length} rentals posted</Text>
                </View>
            </View>
            <View style={tw`flex flex-row w-full justify-around mt-5`}>
                <TouchableOpacity onPress={enquire} style={tw`border border-red-500 p-2 rounded w-32`}>
                    <View style={tw`flex flex-row items-center justify-center gap-2`}>
                        <MessageCircleIcon style={tw`h-5 w-5 text-red-500`} />
                        <Text style={tw`text-center text-red-500 text-lg font-bold`}>Message</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={call} style={tw`bg-red-500 p-2 rounded w-32 `}>
                    <View style={tw`flex flex-row items-center justify-center gap-2`}>
                        <Phone style={tw`h-5 w-5 text-white`} />
                        <Text style={tw`text-center text-white text-lg font-bold`}>Call</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* <Text>{user?.fullname}</Text> */}
            <ScrollView style={tw`py-5 `} >
                <View style={tw`flex gap-5`}>
                    {
                        data?.map((item: any) => (

                            <TouchableOpacity onPress={() => navigation.navigate('Viewitem', {
                                data: item
                            })} key={item?.id}>
                                <View style={tw`flex-row justify-between`}>

                                    <View style={tw`flex-row gap-4 `}>
                                        <Image source={{ uri: item?.image1 }} style={tw`h-24 w-24 rounded-lg`} />

                                        <View style={tw`flex gap-1`}>
                                            <Text style={tw`font-semibold text-base tracking-wider`}>{item?.title}</Text>
                                            <Text style={tw`tracking-wider`}>{item?.rate}</Text>
                                            <Text>{CediFormat.format(item?.lease_cost)}</Text>
                                            <Text>{item?.lease_term}</Text>
                                        </View>
                                    </View>
                                    {/* <TouchableOpacity onPress={() => createTwoButtonAlert(item?.id)} >
                                <Trash2Icon style={tw`h-8 w-8 text-red-500`} />
                            </TouchableOpacity> */}
                                </View>

                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default ViewRenter