import { FlatList, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const ViewItemImage = ({ route }: any) => {
    const { images } = route.params;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    console.log('images', images)
    return (
        <View style={tw` bg-gray-800 flex-1 flex flex-row items-center`}>
            <FlatList
                style={tw`mb-20`}
                horizontal
                data={images}
                pagingEnabled
                // showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (

                    <Image source={{ uri: item?.name as string }} style={[tw`w-full `, { height: 350, width: windowWidth }]} />

                )}
                keyExtractor={(item) => item?.id as any} />
            {/* <FlatList
                horizontal
                data={images}
                pagingEnabled
                // showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (

                    <Image source={{ uri: item?.name as string }} style={[tw`w-full `, { height: 100, width: 100 }]} />

                )}
                keyExtractor={(item) => item?.id as any} /> */}
        </View>
    )
}

export default ViewItemImage
