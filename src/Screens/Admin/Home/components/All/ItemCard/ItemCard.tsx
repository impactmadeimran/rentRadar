import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useNavigation } from "@react-navigation/native";
import { MapPin } from 'lucide-react-native';
import { CediFormat } from '../../../../../../../utils';
import _ from 'lodash';

interface Props {
    data: any;
}

const ItemCard = ({ data }: Props) => {
    // const windowWidth = Dimensions.get('window').width;
    const navigation = useNavigation() as any;
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Viewitem', {
            data: data
        })} style={tw`rounded-xl  mb-5`}>
            <View style={tw`p-2 bg-white rounded-t-xl`}>
                <Image style={[tw`rounded-xl`, { height: 200, resizeMode: "cover", }]} source={{
                    uri: data?.image1
                }} />
            </View>
            <View style={tw`bg-white rounded-b-xl p-3`}>
                <View style={tw`flex flex-row justify-between`}>
                    <Text style={tw`text-lg font-medium text-red-700`}>{data?.title}</Text>
                    <Text style={tw`font-semibold text-gray-600`}>{data?.lease_term}</Text>
                </View>
                <View style={tw`flex-row items-center`}>
                    <Text style={tw`text-gray-600`}>{data?.user?.bus_name}</Text>
                </View>
                <View style={tw`flex flex-row justify-between`}>
                    <View style={tw`flex-row items-center`}>
                        <MapPin style={tw`text-gray-600`} height={18} width={18} />
                        <Text style={tw`text-lg font-medium text-gray-600`}>{_.truncate(data?.location, {
                            length: 25
                        })}</Text>
                    </View>
                    <Text style={tw`text-lg font-medium text-gray-600`}>{CediFormat.format(data?.lease_cost)}</Text>

                </View>

            </View>
        </TouchableOpacity>
    )
}

export default ItemCard