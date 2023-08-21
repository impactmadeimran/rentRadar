import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { HeartIcon, MapPin, MoveLeft } from 'lucide-react-native';
import tw from 'twrnc'


const ViewItem = ({ route, navigation }: any) => {
    const { data } = route.params;
    const windowWidth = Dimensions.get('window').width;

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

    return (
        <View style={tw`flex-1`}>
            {/* <Text>ViewItem</Text> */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={tw`absolute top-14 bg-slate-400 z-50 p-2 ml-5 rounded`}>
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
            <ScrollView style={tw`p-5`}>
                <Text style={tw`text-xl font-semibold tracking-wider text-red-700`}>{data?.title}</Text>
                <View style={tw`justify-between items-center flex-row`}>
                    <Text style={tw`text-xl font-semibold tracking-wider text-red-700`}>{data?.lease_cost}</Text>
                    <HeartIcon height={24} width={24} style={tw`text-red-500`} />
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

            </ScrollView>
        </View>
    )
}

export default ViewItem