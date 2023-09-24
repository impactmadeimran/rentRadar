import { View, TextInput, FlatList, RefreshControl, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import api from '../../../../../utils'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '../../../../hooks/useDebounce'
import ItemCard from '../../Home/components/All/ItemCard/ItemCard'
import Loader from '../../../../components/Loader/Loader'
import { SlidersHorizontal } from 'lucide-react-native'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const debSearch = useDebounce(searchTerm, 1500)
    const [minimumRate, setMinimumRate] = useState('')
    const [maximumRate, setMaximumRate] = useState('')
    const [minimumTerm, setMinimumTerm] = useState('')
    const [maximumTerm, setMaximumTerm] = useState('')
    const debMinRate = useDebounce(minimumRate, 1500)
    const debMaxRate = useDebounce(maximumRate, 1500)
    const debMinTerm = useDebounce(minimumTerm, 1500)
    const debMaxTerm = useDebounce(maximumTerm, 1500)
    const getAll = async () => {
        const res = api.get(`rental/filter/`, {
            params: {
                title: debSearch,
                min_rate: debMinRate,
                max_rate: debMaxRate,
                min_term: debMinTerm,
                max_term: debMaxTerm
            }
        })
        return (await res).data
    }

    const { data, isLoading, refetch, isFetching } = useQuery({
        queryKey: ['searchRent', debSearch, debMinRate, debMaxRate, debMinTerm, debMaxTerm],
        queryFn: getAll
    })
    // const filterRest = async () => {
    //     const res = api.get(`rental/filter/`, {
    //         params: {
    //             // title: debSearch
    //             min_rate: minimumRate,
    //             max_rate: maximumRate,
    //             min_term: minimumTerm,
    //             max_term: maximumTerm
    //         }
    //     })
    //     return (await res).data
    // }

    // const { mutate, data: filterData } = useMutation({
    //     mutationKey: ['filterRent'],
    //     mutationFn: filterRest,
    //     onSuccess: (data) => {
    //         queryClient.setQueryData(['searchRent'], () => data)
    //         console.log('success')
    //     }
    // })
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    // variables
    // const snapPoints = useMemo(() => ['0', '90%'], []);

    // callbacks
    // const handleSheetChanges = useCallback((index: number) => {
    //     console.log('handleSheetChanges', index);
    // }, []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    // console.log('filterdata', filterData)

    if (isLoading || isFetching) return <Loader />

    return (
        <SafeAreaView style={tw`bg-white flex flex-1`}>
            <View style={tw`px-4`}>
                {/* <View style={tw`flex flex-row items-center border-b border-gray-300`}>
                <Search />
                <Filter />
            </View> */}
                <View style={tw`flex flex-row items-center gap-2`}>
                    <TextInput value={searchTerm} onChangeText={(val) => setSearchTerm(val)} style={tw`border border-gray-300 p-2 rounded-xl bg-gray-200 w-full flex-1`} placeholder='Search' />
                    <TouchableOpacity onPress={handlePresentModalPress}>
                        <SlidersHorizontal style={tw`w-full`} size={24} color='black' />
                    </TouchableOpacity>
                </View>
                {/* <View style={tw`bg-white`}> */}

                {/* </View> */}
                <View>
                    <View style={tw`flex flex-row justify-end mt-3`}>
                        <Text style={tw`text-gray-500`}>{data?.length} item(s) found</Text>
                    </View>
                    <FlatList style={tw`mt-5 h-full`} data={data} showsVerticalScrollIndicator={false} renderItem={({ item }) => (

                        <ItemCard data={item} />
                    )} keyExtractor={item => item?.id} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />} />
                </View>

            </View>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <BottomSheetModal
                        ref={bottomSheetRef}
                        index={1}
                        snapPoints={['49%', '50%', '80%']}
                        enablePanDownToClose
                        // snapPoints={snapPoints}
                        keyboardBehavior='interactive'
                    // onChange={handleSheetChanges}
                    >
                        <View style={styles.contentContainer}>
                            <View style={tw`mb-3`}>
                                <Text style={tw`text-2xl`}>Filters</Text>
                            </View>
                            <View style={tw`flex gap-4`}>
                                <View style={tw`flex flex-row items-center`}>
                                    <Text style={tw`flex-1`}>Minimum Rate</Text>
                                    <TextInput onChangeText={setMinimumRate} inputMode='numeric' style={tw`border border-gray-300 p-2 rounded-xl bg-gray-200 w-full flex-1`} />
                                </View>
                                <View style={tw`flex flex-row items-center`}>
                                    <Text style={tw`flex-1`}>Maximum Rate</Text>
                                    <TextInput onChangeText={setMaximumRate} inputMode='numeric' style={tw`border border-gray-300 p-2 rounded-xl bg-gray-200 w-full flex-1`} />
                                </View>
                                <View style={tw`flex flex-row items-center`}>
                                    <Text style={tw`flex-1`}>Minimum Term</Text>
                                    <TextInput onChangeText={setMinimumTerm} inputMode='numeric' style={tw`border border-gray-300 p-2 rounded-xl bg-gray-200 w-full flex-1`} />
                                </View>
                                <View style={tw`flex flex-row items-center`}>
                                    <Text style={tw`flex-1`}>Maximum Term</Text>
                                    <TextInput onChangeText={setMaximumTerm} inputMode='numeric' style={tw`border border-gray-300 p-2 rounded-xl bg-gray-200 w-full flex-1`} />
                                </View>
                                {/* <TouchableOpacity style={tw`bg-red-500 p-2 rounded mt-5`}>
                                    <Text style={tw`text-center text-white font-bold`}>Apply</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 30
        // alignItems: 'center',
    },
});

export default Search
