import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import api from '../../../../../../../utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import tw from 'twrnc'
import { HeartIcon } from 'lucide-react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../../../../../../src/components/Loader/Loader'

const Favorites = ({ navigation }: any) => {
    const getFavorites = async () => {
        const res = await api.get('/rental/favorites/')
        return res.data
    }

    const { data, refetch, isLoading, isFetching } = useQuery({
        queryKey: ['getFavorites'],
        queryFn: getFavorites
    })

    const addToFavorites = async (id: any) => {

        const res = await api.post('/rental/favorites/', {
            rental_id: id
        })
        return res.data

    }

    const { mutate } = useMutation({
        mutationKey: ['add_to_favorites'],
        mutationFn: addToFavorites,
        onSuccess: () => {
            refetch()
        },
        onError: (error) => {
            console.log(error)
        }
    })

    if (isLoading || isFetching) return <Loader />

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
                                    <Text style={tw`tracking-wider`}>{item?.rate}</Text>
                                    <Text>{item?.lease_cost}</Text>
                                    <Text>{item?.lease_term}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => mutate(item?.id)}>
                                {item?.is_favorited ? <AntDesign name={'heart'} size={20} color={'red'} /> : <HeartIcon height={24} width={24} style={tw`text-red-500`} />

                                }
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default Favorites