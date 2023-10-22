import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { CameraIcon } from 'lucide-react-native';
import ImageUploader from '../../../../../src/components/ImageUploader/ImageUploader';
import CustomSelect from '../../../../../src/components/Select/CustomSelect';
import api from '../../../../../utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Loader from '../../../../../src/components/Loader/Loader';

const AddItem = ({ navigation }: any) => {
    // const [image, setImage] = useState<any>(null);
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [image1, setImage1] = useState<string>('');
    const [image2, setImage2] = useState<string>('');
    const [image3, setImage3] = useState<string>('');
    const [image4, setImage4] = useState<string>('');
    const [image5, setImage5] = useState<string>('');
    // const [image6, setImage6] = useState<string>('');
    // const [image7, setImage7] = useState<string>('');
    // const [image8, setImage8] = useState<string>('');
    // const [image9, setImage9] = useState<string>('');
    // const [image10, setImage10] = useState<string>('');
    const [allImages, setAllImages] = useState({})
    const [categories, setCategories] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [rate, setRate] = useState<string>('');
    const [leaseCost, setLeaseCost] = useState<string>('');
    const [leaseTerm, setLeaseTerm] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const queryClient = useQueryClient()

    const categoryData = [
        { value: "real-estate", label: "Real Estate" },
        { value: "vehicles", label: "Vehicles" },
        { value: "event-supplies", label: "Event Supplies" },
        { value: "fashion", label: "Fashion" },
        { value: "recreational", label: "Recreational" },
        { value: "sports", label: "Sports" },
        { value: "electronics", label: "Electronics" }
    ];

    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const imageValid = image1 !== '' && image2 !== '' && image3 !== '' ? true : false

    const selectedCategory = categoryData.find((item) => item.label === categories);

    const createAd = async () => {
        if (!imageValid || title !== '' || description !== '' || location !== '' || rate !== '' || leaseCost !== '' || leaseTerm !== '' || categories !== '') {

            const AllImages: any = {}
            if (image1 !== '') {
                AllImages['image1'] = image1
            }
            if (image2 !== '') {
                AllImages['image2'] = image2
            }
            if (image3 !== '') {
                AllImages['image3'] = image3
            }
            if (image4 !== '') {
                AllImages['image4'] = image4
            }
            if (image5 !== '') {
                AllImages['image5'] = image5
            }
            // if (image6 !== '') {
            //     AllImages['image6'] = image6
            // }
            // if (image7 !== '') {
            //     AllImages['image7'] = image7
            // }
            // if (image8 !== '') {
            //     AllImages['image8'] = image8
            // }
            // if (image9 !== '') {
            //     AllImages['image9'] = image9
            // }
            // if (image10 !== '') {
            //     AllImages['image10'] = image10
            // }

            const res = await api.post('/rental/create/', {
                title,
                location,
                rate,
                lease_cost: leaseCost,
                lease_term: leaseTerm,
                description,
                category: selectedCategory?.value,
                ...AllImages

            })
            return res.data
        }
    }

    const { mutate, isLoading } = useMutation({
        mutationKey: ['create_ad'],
        mutationFn: createAd,
        onSuccess: () => {
            navigation.navigate('Home')
            queryClient.invalidateQueries(['getAllRent'])
        }
    })

    if (isLoading) return <Loader />

    return (
        <SafeAreaView style={tw`flex-1 h-full `} >
            <BottomSheetModalProvider>

                {/* <TouchableOpacity onPress={pickImage}>
                <Text>Post ad </Text>
                <Image source={{ uri: image as string }} style={{ width: 200, height: 200 }} />
            </TouchableOpacity> */}

                <ScrollView keyboardShouldPersistTaps='never' style={tw`px-4 h-full `} >

                    <Text style={tw`text-xl font-semibold`}>Post Ad</Text>
                    <View style={tw`mt-10 flex  gap-5`}>
                        <TouchableOpacity onPress={handlePresentModalPress} style={tw`border p-3 rounded border-gray-400 flex flex-row items-center gap-2`}>
                            <CameraIcon style={tw`text-gray-400`} size={30} />
                            <Text>Tap here to upload images. Minimum of 3 images</Text>
                        </TouchableOpacity>
                        <View>
                            <Text>Tilte</Text>
                            <TextInput onChangeText={setTitle} placeholder="Enter title" style={tw`p-2 border border-gray-400 rounded`} />
                        </View>
                        <View>
                            <Text>Location</Text>
                            <TextInput onChangeText={setLocation} placeholder="Enter location" style={tw`p-2 border border-gray-400 rounded`} />
                        </View>
                        <View>
                            <Text>Rate</Text>
                            <TextInput onChangeText={setRate} placeholder="Enter Rate" style={tw`p-2 border border-gray-400 rounded`} />
                        </View>
                        <View>
                            <Text>Lease Cost</Text>
                            <TextInput onChangeText={setLeaseCost} placeholder="Enter Lease Cost" style={tw`p-2 border border-gray-400 rounded`} />
                        </View>
                        <View>
                            <Text>Lease Term</Text>
                            <TextInput onChangeText={setLeaseTerm} placeholder="Enter Lease Term" style={tw`p-2 border border-gray-400 rounded`} />
                        </View>
                        <View>
                            <Text>Category</Text>
                            <CustomSelect options={['Real Estate', 'Vehicles', 'Event Supplies', 'Fashion', 'Recreational', 'Sports', 'Electronics']} onSelect={setCategories} selectedOption={categories} />
                        </View>
                        <View>
                            <Text>Description</Text>
                            <TextInput onChangeText={setDescription} numberOfLines={5} multiline={true} placeholder="Enter description" style={tw`p-2 border border-gray-400 rounded min-h-20
                        `} />
                        </View>
                        <TouchableOpacity onPress={() => mutate()} style={tw`bg-red-500 text-center p-2 rounded`}>
                            <Text style={tw`text-white flex text-lg text-center font-extrabold`}>Post Ad</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <BottomSheetModal
                            ref={bottomSheetRef}
                            index={1}
                            snapPoints={['95%', '90%']}
                            enablePanDownToClose
                            // snapPoints={snapPoints}
                            keyboardBehavior='interactive'
                        // onChange={handleSheetChanges}
                        >
                            <View style={tw`px-4`}>

                                <Text>Select images. First 3 images are required.</Text>
                                <View style={tw`mt-3 flex gap-3`}>
                                    <ImageUploader setImage={setImage1} image={image1} label='Image 1' />
                                    <ImageUploader setImage={setImage2} image={image2} label='Image 2' />
                                    <ImageUploader setImage={setImage3} image={image3} label='Image 3' />
                                    <ImageUploader setImage={setImage4} image={image4} label='Image 4' />
                                    <ImageUploader setImage={setImage5} image={image5} label='Image 5' />
                                    {/* <ImageUploader setImage={setImage6} image={image6} label='Image 6' />
                                    <ImageUploader setImage={setImage7} image={image7} label='Image 7' />
                                    <ImageUploader setImage={setImage8} image={image8} label='Image 8' />
                                    <ImageUploader setImage={setImage9} image={image9} label='Image 9' />
                                    <ImageUploader setImage={setImage10} image={image10} label='Image 10' /> */}
                                </View>
                            </View>
                        </BottomSheetModal>

                    </View>
                </ScrollView>
            </BottomSheetModalProvider>
        </SafeAreaView>
    )
}

export default AddItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,

    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 30
        // alignItems: 'center',
    },
});
