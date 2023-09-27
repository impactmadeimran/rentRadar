import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import api from '../../../../../../../utils'
import { useUserContext } from '../../../../../../../src/context/UserContext'
import { useQuery } from '@tanstack/react-query'
import tw from 'twrnc'
import Loader from '../../../../../../../src/components/Loader/Loader'

const Posts = () => {
    const { tokenDecoded } = useUserContext()
    const fetchPosts = async () => {
        const res = await api.get(`/rental/user/${tokenDecoded?.user_id}/`)
        return res.data;
    }

    const { data, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })

    if (isLoading) return <Loader />
    return (
        <View style={tw`p-4 pt-10 flex gap-5 bg-white flex-1`}>
            {
                data?.map((item: any) => (

                    <TouchableOpacity>
                        <View style={tw`flex-row gap-4`}>
                            <Image source={{ uri: item?.image1 }} style={tw`h-24 w-24 rounded-lg`} />
                            <View>
                                <Text style={tw`font-semibold text-base tracking-wider`}>{item?.title}</Text>
                                <Text style={tw`tracking-wider`}>{item?.rate}</Text>
                                <Text>{item?.lease_cost}</Text>
                                <Text>{item?.lease_term}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default Posts