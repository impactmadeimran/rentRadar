import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../../../../../../../utils'
import { useMutation, useQuery } from '@tanstack/react-query'
// import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
// import emptyUser from 'src/assets/noUser.png'
import Loader from '../../../../../../../src/components/Loader/Loader'
import { set } from 'lodash'
import ImageUploader from '../../../../../../../src/components/ImageUploader/ImageUploader'

const Profile = ({ navigation }: any) => {
    // const [profileImage, setProfileImage] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [businessName, setBusinessName] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [profileImage, setProfileImage] = useState<string>('')
    const fetchUser = async () => {
        const res = await api.get('/user/')
        return res.data
    }

    const { data, isLoading, refetch, isFetching } = useQuery({
        queryFn: fetchUser,
        queryKey: ['user_data']
    })

    const updateProfile = async () => {
        const res = await api.patch('/user/', {
            email: email ?? data?.email,
            bus_name: businessName ?? data?.bus_name,
            phone: phoneNumber ?? data?.phone_numbe,
            location: location ?? data?.location,
            first_name: firstName ?? data?.full_name?.split(' ')[0],
            last_name: lastName ?? data?.full_name?.split(' ')[1],
            profile_image: profileImage ?? data?.profile_image
        })
        return res.data
    }

    const { mutate, isLoading: mutateLoad } = useMutation({
        mutationKey: ['updateProfile'],
        mutationFn: updateProfile,
        onSuccess: (data) => {
            if (data) {
                refetch()
                navigation.goBack()
                Alert.alert('Profile updated successfully')

            }
        }
    })

    useEffect(() => {
        setFirstName(data?.full_name?.split(' ')[0])
        setLastName(data?.full_name?.split(' ')[1])
        setEmail(data?.email)
        setBusinessName(data?.bus_name)
        setPhoneNumber(data?.phone)
        setLocation(data?.location)

    }, [data])


    if (isLoading || mutateLoad || isFetching) return <Loader />

    return (
        <ScrollView style={tw`p-4 bg-white flex-1`}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View>
                    <ImageUploader image={profileImage} setImage={setProfileImage} label='' profileImage={true} folder='profile_photos' />
                    {/* <View style={tw`flex items-center mb-5`}>
                        <Image source={data?.profile_image === null ? emptyUser : { uri: data?.profile_image }} style={tw`w-28 h-28 rounded-full`} />
                        <TouchableOpacity>
                            <Text style={tw`text-center text-blue-500 mt-2`}>Edit picture or avatar</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={tw` flex gap-5 border-gray-200 border-t pt-3`}>
                        <View style={tw` flex-row justify-between `}>
                            <Text style={tw`text-base flex-1`}>Email</Text>

                            <TextInput editable={false} onChangeText={setEmail} defaultValue={data?.email} style={tw`border-b border-gray-200  w-full flex-1`} />

                        </View>
                        <View style={tw` flex-row justify-between`}>
                            <Text style={tw`text-base flex-1`}>First Name</Text>

                            <TextInput onChangeText={setFirstName} defaultValue={data?.full_name?.split(' ')[0]} style={tw`border-b border-gray-200  w-full flex-1`} />
                        </View>
                        <View style={tw` flex-row justify-between`}>
                            <Text style={tw`text-base flex-1`}>Last Name</Text>

                            <TextInput onChangeText={setLastName} defaultValue={data?.full_name?.split(' ')[1]} style={tw`border-b border-gray-200  w-full flex-1`} />
                        </View>
                        <View style={tw` flex-row justify-between`}>
                            <Text style={tw`text-base flex-1`}>Business name</Text>
                            {/* <Text>{data?.bus_name ?? "Not Specified"}</Text> */}
                            <TextInput onChangeText={setBusinessName} defaultValue={data?.bus_name ?? "Not Specified"} style={tw`border-b border-gray-200  w-full flex-1`} />

                        </View>
                        <View style={tw` flex-row justify-between`}>
                            <Text style={tw`text-base flex-1`}>Phone Number</Text>
                            {/* <Text>{data?.phone}</Text> */}
                            <TextInput onChangeText={setPhoneNumber} defaultValue={data?.phone ?? "Not Specified"} style={tw`border-b border-gray-200  w-full flex-1`} />
                        </View>
                        <View style={tw` flex-row justify-between`}>
                            <Text style={tw`text-base flex-1`}>Location</Text>
                            {/* <Text>{data?.location}</Text> */}
                            <TextInput onChangeText={setLocation} defaultValue={data?.location ?? "Not Specified"} style={tw`border-b border-gray-200  w-full flex-1`} />
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => mutate()} style={tw`bg-red-500  rounded-lg mt-10`}>
                        <Text style={tw`text-white text-lg text-center font-extrabold py-2`}>Update</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

export default Profile

