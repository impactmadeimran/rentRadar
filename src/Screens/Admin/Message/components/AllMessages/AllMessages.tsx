import { useQuery } from "@tanstack/react-query"
import { SafeAreaView, Text } from "react-native"
import api from "../../../../../../utils"

const AllMessages = () => {

    const getAllMessages = async () => {
        const res = await api.get('/chat/')
        return res.data
    }

    const { data } = useQuery({
        queryKey: ['get_all_Messages'],
        queryFn: getAllMessages
    })

    console.log(data)

    return (
        <SafeAreaView>

            <Text>AllMessages</Text>
        </SafeAreaView>
    )
}

export default AllMessages