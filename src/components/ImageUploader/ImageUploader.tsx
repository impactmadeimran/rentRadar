import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import tw from 'twrnc'
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../../src/hooks/supabase';
import { useUserContext } from '../../../src/context/UserContext';
import * as FileSystem from 'expo-file-system'
import { decode } from 'base64-arraybuffer';

interface Props {
    label: string;
    setImage: Dispatch<SetStateAction<any>>;
    image: string;
}

const ImageUploader = ({ image, setImage, label }: Props) => {
    const { user } = useUserContext()
    const [imagePath, setImagePath] = useState<any>(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            uploadToSupa(result)

        }
    };

    const uploadToSupa = async (result: ImagePicker.ImagePickerResult) => {
        if (result.assets) {
            const img = result.assets[0];
            const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
            const filePath = `${user?.email}/${new Date().getTime()}-${img.fileName}`;
            const contentType = img.type === 'image' ? 'image/jpeg' : 'video/mp4';

            const { data, error } = await supabase.storage.from('rental_photos').upload(filePath, decode(base64), { contentType })
            if (error) {
                console.log('error', error)
            } else {
                console.log('data', data)
                setImagePath(filePath)
            }

        }
    }

    function downloadImage(path: string) {
        try {
            const { data } = supabase.storage.from('rental_photos').getPublicUrl(path)
            // console.log(data)
            setImage(data?.publicUrl)
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error downloading image: ', error.message)
            }
        }
    }

    useEffect(() => {
        if (imagePath) {
            downloadImage(imagePath)
        }
    }, [imagePath])
    return (
        <TouchableOpacity onPress={pickImage} style={tw`border p-3 rounded border-gray-400 flex flex-row items-center gap-2`}>
            {image && <Image source={{ uri: image ?? '' }} height={30} width={30} />}
            <Text>{label ?? 'Image 1'} </Text>
        </TouchableOpacity>
    )
}

export default ImageUploader