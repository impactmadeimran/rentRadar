import { FlatList, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Search from "./components/SearchFilter/Search"
import tw from 'twrnc'
import Filter from "./components/SearchFilter/Filter"
import { useUserContext } from "../../../context/UserContext"
import ItemCard from "./components/ItemCard/ItemCard"
import api from "../../../../utils"
import { useQuery } from "@tanstack/react-query"

const Home = () => {
    const { token } = useUserContext()
    console.log(token)
    const getAll = async () => {
        const res = api.get('rental/all/')
        return (await res).data
    }

    const { data } = useQuery({
        queryKey: ['getAllRent'],
        queryFn: getAll
    })

    console.log(data)

    return (
        <SafeAreaView style={tw`px-4`}>
            <View style={tw`flex flex-row items-center border-b border-gray-300`}>
                <Search />
                <Filter />
            </View>
            {/* <ScrollView>
                <View> */}
            <FlatList style={tw`mt-5`} data={data} renderItem={({ item }) => (

                <ItemCard data={item} />
            )} keyExtractor={item => item?.id} />
            {/* </View>
            </ScrollView> */}
        </SafeAreaView>
    )
}

export default Home