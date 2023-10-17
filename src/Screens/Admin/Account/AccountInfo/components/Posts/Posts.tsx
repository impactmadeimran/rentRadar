import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import api, { CediFormat } from '../../../../../../../utils'
import { useUserContext } from '../../../../../../../src/context/UserContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import tw from 'twrnc'
import Loader from '../../../../../../../src/components/Loader/Loader'
import { Trash2Icon } from 'lucide-react-native'

const Posts = ({ navigation }: any) => {
    const { tokenDecoded } = useUserContext()
    const fetchPosts = async () => {
        const res = await api.get(`/rental/user/${tokenDecoded?.user_id}/`)
        return res.data;
    }

    const { data, isLoading, refetch, isFetching } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })

    const deletePost = async (id: any) => {
        const res = await api.delete(`/rental/delete/${id}/`)
        return res.data
    }

    const { mutate, isLoading: mutateLoad } = useMutation({
        mutationKey: ['delete_post'],
        mutationFn: deletePost,
        onSuccess: () => {
            refetch()
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const createTwoButtonAlert = (id: any) =>
        Alert.alert('Delete this post?', 'To continue, press delete', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete', onPress: () => mutate(id) },
        ]);

    if (isLoading || mutateLoad || isFetching) return <Loader />
    return (
        <View style={tw`p-4 pt-10 flex gap-5 bg-white flex-1`}>
            {
                data?.map((item: any) => (

                    <TouchableOpacity onPress={() => navigation.navigate('ViewItemAccount', {
                        data: item
                    })} key={item?.id}>
                        <View style={tw`flex-row justify-between`}>

                            <View style={tw`flex-row gap-4 `}>
                                <Image source={{ uri: item?.image1 }} style={tw`h-24 w-24 rounded-lg`} />

                                <View style={tw`flex gap-1`}>
                                    <Text style={tw`font-semibold text-base tracking-wider`}>{item?.title}</Text>
                                    <Text style={tw`tracking-wider`}>{CediFormat.format(item?.rate)}</Text>
                                    <Text>{CediFormat.format(item?.lease_cost)}</Text>
                                    <Text>{item?.lease_term}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => createTwoButtonAlert(item?.id)} >
                                <Trash2Icon style={tw`h-8 w-8 text-red-500`} />
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default Posts