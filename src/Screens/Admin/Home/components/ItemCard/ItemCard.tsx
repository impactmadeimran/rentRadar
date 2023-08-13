import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
interface Props {
    data: any
}

const ItemCard = ({ data }: Props) => {
    console.log(data?.image1)
    return (
        <View style={tw`rounded-xl  mb-5`}>
            <Image style={[tw`rounded-t-xl`, { height: 200, resizeMode: 'stretch' }]} source={{
                uri: data?.image1
            }} />
            <View style={tw`bg-white rounded-b-xl p-3`}>
                <View style={tw`flex flex-row justify-between`}>
                    <Text style={tw`text-lg font-medium`}>{data?.title}</Text>
                    <Text style={tw`font-semibold `}>{data?.lease_term}</Text>
                </View>
                <View style={tw`flex flex-row justify-between`}>
                    <Text style={tw`text-lg font-medium`}>{data?.location}</Text>
                    <Text style={tw`text-lg font-medium`}>{data?.lease_cost}</Text>

                </View>

            </View>
        </View>
    )
}

export default ItemCard