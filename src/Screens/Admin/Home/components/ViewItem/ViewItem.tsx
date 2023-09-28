import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { HeartIcon, MapPin, MoveLeft } from 'lucide-react-native';
import tw from 'twrnc'
import api from '../../../../../../utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../../../../../src/components/Loader/Loader';
import { useUserContext } from '../../../../../../src/context/UserContext';

const ViewItem = ({ route, navigation }: any) => {
    const { token } = useUserContext()
    const { data: rentData } = route.params;
    const windowWidth = Dimensions.get('window').width;

    const getRentDetails = async () => {
        const res = await api.get(`/rental/details/${rentData?.id}/`)
        return res.data
    }

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['getRentDetails'],
        queryFn: getRentDetails
    })

    const images = [
        { name: data?.image1, id: 1 },
        { name: data?.image2, id: 2 },
        { name: data?.image3, id: 3 },
        { name: data?.image4, id: 4 },
        { name: data?.image5, id: 5 },
        { name: data?.image6, id: 6 },
        { name: data?.image7, id: 7 },
        { name: data?.image8, id: 8 },
        { name: data?.image9, id: 9 },
        { name: data?.image10, id: 10 },
    ]

    const nonNullImages = images.filter((item) => item?.name !== null)

    const addToFavorites = async () => {
        if (token) {
            const res = await api.post('/rental/favorites/', {
                rental_id: data?.id
            })
            return res.data
        } else {
            navigation.navigate('Auth')
        }
    }

    const { mutate } = useMutation({
        mutationKey: ['add_to_favorites'],
        mutationFn: addToFavorites,
        onSuccess: (data) => {
            console.log(data)
            refetch()
        },
        onError: (error) => {
            console.log(error)
        }
    })

    if (isLoading) return <Loader />

    return (

        <View style={tw`flex-1`}>
            <ScrollView style={tw``}>
                {/* <Text>ViewItem</Text> */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={tw`absolute top-14 bg-red-700 z-50 p-2 ml-5 rounded`}>
                    <MoveLeft color='white' height={24} width={24} />
                </TouchableOpacity>
                <View style={tw` bg-gray-200`}>
                    <FlatList
                        horizontal
                        data={nonNullImages}
                        pagingEnabled
                        // showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('Viewimage', {
                                images: nonNullImages
                            })}>
                                <Image source={{ uri: item?.name as string }} style={[tw`w-full`, { height: 350, width: windowWidth }]} />
                            </TouchableOpacity>
                        )}


                        keyExtractor={(item) => item?.id as any} />
                </View>
                <View style={tw`p-4`}>
                    <Text style={tw`text-xl font-semibold tracking-wider text-red-700`}>{data?.title}</Text>
                    <Text style={tw`text-xl font-semibold tracking-wider text-red-700`}>{data?.user?.bus_name}</Text>
                    <View style={tw`justify-between items-center flex-row`}>
                        <Text style={tw`text-xl font-semibold tracking-wider text-red-700`}>{data?.lease_cost}</Text>
                        <TouchableOpacity onPress={() => mutate()}>
                            {!data?.is_favorited ? <HeartIcon height={24} width={24} style={tw`text-red-500`} />
                                : <AntDesign name={'heart'} size={20} color={'red'} />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={tw`mt-6 flex-row items-center gap-2`}>
                        <MapPin height={24} width={24} style={tw`text-gray-600`} />
                        <Text style={tw`text-lg text-gray-600`}>{data?.location}</Text>
                    </View>
                    <View style={tw`py-4 border-t border-gray-300 mt-4`}>
                        <Text style={tw`text-xl tracking-wider font-semibold`}>
                            Description
                        </Text>
                        <View>
                            <Text>{data?.description}</Text>
                        </View>
                    </View>
                    <View style={tw`py-4 border-t border-gray-300 my-4`}>
                        <Text style={tw`text-xl tracking-wider font-semibold`}>
                            Information
                        </Text>
                        <View>
                            <View style={tw`flex-row items-center border-b border-gray-200 py-4`}>
                                <Text style={tw`text-base capitalize flex-1`}>Lease term</Text>
                                <Text style={tw`text-base capitalize flex-1`}>{data?.lease_term}</Text>
                            </View>
                            <View style={tw`flex-row items-center border-b border-gray-200 py-4`}>
                                <Text style={tw`text-base capitalize flex-1`}>Category</Text>
                                <Text style={tw`text-base capitalize flex-1`}>{data?.category}</Text>
                            </View>
                            <View style={tw`flex-row items-center border-b border-gray-200 py-4`}>
                                <Text style={tw`text-base capitalize flex-1`}>Lease rate</Text>
                                <Text style={tw`text-base capitalize flex-1`}>{data?.rate}</Text>
                            </View>
                            <View style={tw`flex-row items-center border-b border-gray-200 py-4`}>
                                <Text style={tw`text-base capitalize flex-1`}>Cost</Text>
                                <Text style={tw`text-base capitalize flex-1`}>{data?.lease_cost}</Text>
                            </View>
                            <View style={tw`flex-row items-center border-b border-gray-200 py-4`}>
                                <Text style={tw`text-base capitalize flex-1`}>Location</Text>
                                <Text style={tw`text-base capitalize flex-1`}>{data?.location}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ViewItem