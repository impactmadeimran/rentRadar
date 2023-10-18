import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc'
import { useQuery } from "@tanstack/react-query"
import Loader from "../../../../../components/Loader/Loader"
import ItemCard from "./ItemCard/ItemCard"
import api from "../../../../../../utils"
import { useUserContext } from "../../../../../context/UserContext"
const AllItems = () => {
    const { tokenDecoded } = useUserContext()
    const getAll = async () => {
        const res = api.get('rental/all/')
        return (await res).data
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getAllRent'],
        queryFn: getAll
    })

    const filteredData = data?.filter((item: any) => item?.user?.id !== tokenDecoded?.user_id)

    if (isLoading) return <Loader />
    return (
        <SafeAreaView style={tw`px-4 `}>
            {/* <View style={tw`flex flex-row items-center border-b border-gray-300`}>
                <Search />
                <Filter />
            </View> */}
            {/* <ScrollView>
            <View> */}
            <FlatList style={tw`mt-5 h-full`} data={filteredData} showsVerticalScrollIndicator={false} renderItem={({ item }) => (

                <ItemCard data={item} />
            )} keyExtractor={item => item?.id} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />} />
            {/* </View>
        </ScrollView> */}
        </SafeAreaView>
    )
}

export default AllItems
