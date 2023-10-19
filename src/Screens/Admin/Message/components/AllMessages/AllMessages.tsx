import { useQuery } from "@tanstack/react-query"
import { FlatList, Image, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import api from "../../../../../../utils"
import { useUserContext } from "../../../../../../src/context/UserContext"
import Loader from "../../../../../../src/components/Loader/Loader"
import noUser from "../../../../../../src/assets/noUser.png"
import tw from 'twrnc'
import _ from "lodash"
import { useEffect } from "react"
import AuthenticateUser from "../../../../../../src/Screens/Admin/Account/AuthenticateUser/AuthenticateUser"

const AllMessages = ({ navigation }: any) => {

    const { tokenDecoded } = useUserContext()

    const getAllMessages = async () => {
        const res = await api.get('/chat/')
        return res.data
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['get_all_Messages'],
        queryFn: getAllMessages
    })

    // console.log(data)

    const initiator = data?.map((item: any) => item?.initiator)?.filter((item: any) => item?.id !== tokenDecoded?.user_id)
    const receiver = data?.map((item: any) => item?.receiver)?.filter((item: any) => item?.id !== tokenDecoded?.user_id)


    const dataToMap = (initiator && receiver) && [...receiver, ...initiator];
    console.log('dat', dataToMap)


    if (_.isEmpty(tokenDecoded)) return <AuthenticateUser />

    if (isLoading) return <Loader />

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <View style={tw`flex gap-3 p-4`}>
                <FlatList style={tw`h-full`} data={dataToMap} showsVerticalScrollIndicator={false} renderItem={({ item, index }) => (

                    <TouchableOpacity onPress={() => navigation.navigate(navigation.navigate('Conversation', {
                        // screen: 'Conversation',
                        params: {
                            id: item?.id,
                            fullname: item?.full_name,
                            profile_image: item?.profile_image
                        },
                    }))} style={tw`flex flex-row items-center gap-2 pt-2 ${index < 1 ? "" : 'border-t border-gray-200'} `}>
                        <Image source={item?.profile_image ? { uri: item?.profile_image } : noUser} style={tw`w-14 h-14 rounded-full`} />
                        <Text key={item?.id}>{item?.full_name}</Text>
                    </TouchableOpacity>
                )} keyExtractor={item => item?.id} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />} />
            </View>
        </SafeAreaView>
    )
}

export default AllMessages