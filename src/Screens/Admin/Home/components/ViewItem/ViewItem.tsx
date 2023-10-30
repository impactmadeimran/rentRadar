import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, Platform } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { BadgeCheck, HeartIcon, MapPin, MessageCircleIcon, MoveLeft, PenLine, Phone } from 'lucide-react-native';
import tw from 'twrnc'
import api, { CediFormat } from '../../../../../../utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../../../../../src/components/Loader/Loader';
import { useUserContext } from '../../../../../../src/context/UserContext';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native-gesture-handler';
import { Linking } from 'react-native'
import emptyUSer from 'src/assets/noUser.png'

const ViewItem = ({ route, navigation }: any) => {
    const { token } = useUserContext()
    const { data: rentData, } = route.params;
    const windowWidth = Dimensions.get('window').width;
    const [review, setReview] = useState('')

    const getRentDetails = async () => {
        const res = await api.get(`/rental/details/${rentData?.id}/`)
        return res.data
    }

    const { data, refetch, isLoading, isFetching } = useQuery({
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
        onSuccess: () => {
            refetch()
        },
    })

    const getReviews = async () => {
        const res = await api.get(`/review/rental/all/${data?.id}/`)
        return res.data
    }

    const { data: reviews, refetch: fetchReviews } = useQuery({
        queryKey: ['getReviews', data],
        queryFn: getReviews
    })

    const createReview = async () => {
        const res = await api.post('/review/rental/create/', {
            rental_reviewed: data?.id,
            body: review
        })
        return res.data
    }

    const { mutate: createReviewMutate, isLoading: addReviewLoad } = useMutation({
        mutationKey: ['createReview'],
        mutationFn: createReview,
        onSuccess: () => {
            fetchReviews()
            bottomSheetRef.current?.dismiss()
        }
    })

    // console.log(data?.user?.id)

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const call = () => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${'233206812111'}`;
        } else {
            phoneNumber = `telprompt:${'233206812111'}`;
        }

        Linking.openURL(phoneNumber);
        // Linking.openURL(`tel:${data?.user?.phone}`)
    }



    const enquire = (id: any) => {
        if (!token) {
            Alert.alert('You have to be logged in to continue', 'To continue, press Login', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Login', onPress: () => navigation.navigate('Auth', {
                        screen: 'Login'
                    })
                },
            ]);
        } else {
            navigation.navigate('Conversation', {
                // screen: 'Conversation',
                params: {
                    id: data?.user?.id,
                    fullname: data?.user?.full_name,
                    profile_image: data?.user?.profile_image
                },
            })
        }
    }

    console.log(data)

    if (isLoading || addReviewLoad || isFetching) return <Loader />

    return (

        <View style={tw`flex-1`}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={tw`absolute top-14 bg-red-700 z-50 p-2 ml-5 rounded-full`}>
                <MoveLeft color='white' height={24} width={24} />
            </TouchableOpacity>
            <ScrollView style={tw``}>
                <BottomSheetModalProvider>
                    {/* <Text>ViewItem</Text> */}

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
                            <Text style={tw`text-base font-semibold tracking-wider text-red-700`}>{CediFormat.format(data?.lease_cost)}</Text>
                            <TouchableOpacity onPress={() => mutate()}>
                                {!data?.is_favorited ? <HeartIcon height={24} width={24} style={tw`text-red-500`} />
                                    : <AntDesign name={'heart'} size={20} color={'red'} />
                                }
                            </TouchableOpacity>
                        </View>
                        {/* <View style={tw`mt-6 flex-row items-center gap-2`}>
                            <MapPin height={24} width={24} style={tw`text-gray-600`} />
                            <Text style={tw`text-lg text-gray-600`}>{data?.location}</Text>
                        </View> */}
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('ViewRenter', {
                                // screen: 'Conversation',
                                params: {
                                    id: data?.user?.id,
                                    fullname: data?.user?.full_name,
                                    profile_image: data?.user?.profile_image,
                                    business_name: data?.user?.bus_name
                                },
                            })
                        }} style={tw`flex flex-row items-center gap-2 mt-5`}>
                            <Image source={!data?.user?.profile_image ? emptyUSer : { uri: data?.user?.profile_image }} style={tw`w-12 h-12 rounded-full `} />
                            <View>
                                <Text style={tw`text-lg text-gray-600 font-bold`}>{data?.user?.full_name}</Text>
                                {/* <Text style={tw`text-lg text-gray-600`}>{data?.user?.phone}</Text> */}
                            </View>
                            {data?.user?.is_kyc_verified && <BadgeCheck style={tw`h-10 w-10`} />}
                        </TouchableOpacity>
                        <View style={tw`flex flex-row w-full justify-around mt-5`}>
                            <TouchableOpacity onPress={enquire} style={tw`border border-red-500 p-2 rounded w-32`}>
                                <View style={tw`flex flex-row items-center justify-center gap-2`}>
                                    <MessageCircleIcon style={tw`h-5 w-5 text-red-500`} />
                                    <Text style={tw`text-center text-red-500 text-lg font-bold`}>Message</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={call} style={tw`bg-red-500 p-2 rounded w-32 `}>
                                <View style={tw`flex flex-row items-center justify-center gap-2`}>
                                    <Phone style={tw`h-5 w-5 text-white`} />
                                    <Text style={tw`text-center text-white text-lg font-bold`}>Call</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`pt-4 border-t border-gray-300 my-4`}>
                            {/* <Text style={tw`text-xl tracking-wider font-semibold`}>
                                Information
                            </Text> */}
                            <View>
                                <View style={tw`flex-row items-center  py-2`}>
                                    <Text style={tw`text-base capitalize flex-1`}>Lease term</Text>
                                    <Text style={tw`text-base capitalize flex-1`}>{data?.lease_term}</Text>
                                </View>
                                <View style={tw`flex-row items-center  py-2`}>
                                    <Text style={tw`text-base capitalize flex-1`}>Category</Text>
                                    <Text style={tw`text-base capitalize flex-1`}>{data?.category}</Text>
                                </View>
                                <View style={tw`flex-row items-center  py-2`}>
                                    <Text style={tw`text-base capitalize flex-1`}>Lease rate</Text>
                                    <Text style={tw`text-base capitalize flex-1`}>{data?.rate}</Text>
                                </View>
                                <View style={tw`flex-row items-center  py-2`}>
                                    <Text style={tw`text-base capitalize flex-1`}>Cost</Text>
                                    <Text style={tw`text-base capitalize flex-1`}>{CediFormat.format(data?.lease_cost)}</Text>
                                </View>
                                <View style={tw`flex-row items-center  py-2`}>
                                    <Text style={tw`text-base capitalize flex-1`}>Location</Text>
                                    <Text style={tw`text-base capitalize flex-1`}>{data?.location}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={tw`py-4 border-t border-gray-300 mt-4`}>
                            {/* <Text style={tw`text-xl tracking-wider font-semibold`}>
                                Description
                            </Text> */}
                            <View>
                                <Text>{data?.description}</Text>
                            </View>
                        </View>
                        {token && <View style={tw`py-4 border-t border-gray-300 my-4`}>
                            <View style={tw`flex flex-row justify-between items-center`}>
                                <Text style={tw`text-xl tracking-wider font-semibold mb-3`}>Feedback</Text>
                                <TouchableOpacity onPress={handlePresentModalPress} >
                                    {/* <PenLine color='white' height={24} width={24} /> */}
                                    <Text style={tw`text-red-600`}>Leave feedback</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={tw`gap-2`}>
                                {
                                    reviews?.map((item: any, index: number) => (
                                        <View key={index} style={tw` border-b border-gray-200 py-4 bg-slate-300 px-3 rounded-lg`}>
                                            <View style={tw`flex flex-row items-center gap-2`}>
                                                <View style={tw`h-8 w-8 rounded-full bg-green-700 items-center justify-center`}>
                                                    <Text style={tw`text-white text-lg font-semibold`}>{item?.user?.full_name[0]}</Text>
                                                </View>
                                                <Text style={tw`text-base capitalize font-semibold flex-1`}>{item?.user?.full_name}</Text>
                                            </View>
                                            <Text style={tw`text-base capitalize flex-1`}>{item?.body}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>}
                    </View>
                    <BottomSheetModal
                        ref={bottomSheetRef}
                        index={1}
                        snapPoints={['39%', '40%']}
                        enablePanDownToClose
                        // snapPoints={snapPoints}
                        keyboardBehavior='interactive'
                    // onChange={handleSheetChanges}
                    >
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={tw`p-4`}>
                                <Text style={tw`text-lg font-semibold mb-2`}>Write a review</Text>
                                <View style={tw`gap-4`}>
                                    <TextInput multiline onChangeText={setReview} placeholder="Enter review" style={tw`p-2 border border-gray-400 rounded min-h-24`} />
                                    <TouchableOpacity onPress={() => createReviewMutate()} style={tw`bg-red-500 text-center p-2 rounded`}>
                                        <Text style={tw`text-white flex text-lg text-center font-extrabold`}>Add Review</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </ScrollView>
        </View>
    )
}

export default ViewItem