import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ImageUploader from '../../../../../../components/ImageUploader/ImageUploader'
import tw from 'twrnc'
import api from '../../../../../../../utils'
import _ from 'lodash'
import { useMutation } from '@tanstack/react-query'
import Loader from '../../../../../../components/Loader/Loader'

const KYC = ({ navigation }: any) => {
    const [frontImage, setFrontImage] = useState<string>('');
    const [backImage, setBackImage] = useState<string>('');
    const [selfie, setSelfie] = useState<string>('');

    const uploadKyc = async () => {
        if (_.isEmpty(frontImage) && _.isEmpty(backImage) && _.isEmpty(selfie)) {
            Alert.alert('Please upload all images')
        } else {
            const res = await api.post('/user/kyc/', {
                id_front_image: frontImage,
                id_back_image: backImage,
                selfie_image: selfie
            })
            return res.data
        }
    }

    const { mutate, isLoading } = useMutation(({
        mutationKey: ['uploadKyc'],
        mutationFn: uploadKyc,
        onSuccess: (data) => {
            if (data) {
                Alert.alert('KYC uploaded successfully')
                navigation.navigate('AccountInfo')
            }
        }
    }))

    if (isLoading) return <Loader />

    return (
        <View style={tw`p-4`}>
            <View style={tw`flex gap-4`}>
                <ImageUploader setImage={setFrontImage} image={frontImage} label='Upload Front of ID ' folder='kyc_photos' />
                <ImageUploader setImage={setBackImage} image={backImage} label='Upload Back of ID ' folder='kyc_photos' />
                <ImageUploader setImage={setSelfie} image={selfie} label='Upload Selfie with ID ' folder='kyc_photos' />

            </View>

            <TouchableOpacity onPress={() => mutate()} style={tw`bg-red-500  rounded-lg mt-10`}>
                <Text style={tw`text-white text-lg text-center font-extrabold py-2`}>Upload</Text>
            </TouchableOpacity>
        </View>
    )
}

export default KYC