import { View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../../../../../../utils'
import tw from 'twrnc'
import { SendHorizonal } from 'lucide-react-native'

const Conversation = ({ route }: any) => {
    const [convoId, setConvoId] = useState('')
    const [message, setMessage] = useState('')
    const user = route.params?.user;

    const startConvo = async () => {
        const res = await api.post(`/chat/start/${user?.id}/`)
        return res.data
    }

    const { data } = useQuery({
        queryKey: ['startConvo'],
        queryFn: startConvo,
        onSuccess: (data) => {
            setConvoId(data.id)
        },
        onError: (err) => console.log(err)
    })

    const messageToSend = {
        message: message
    }
    const ws = new WebSocket(`ws://206.81.18.243:5555/api/v1/chat/${convoId}/`);

    useEffect(() => {
        if (convoId) {

            ws.onopen = () => {
                console.log('connected')
            }
            console.log('convoid', convoId)
        }
    }, [data])


    const sendMessage = () => {
        if (message !== "") {
            ws.send(JSON.stringify(messageToSend))
        }
    }

    console.log('data', data)


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex flex-1  h-full`}>
            <View>
            </View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={tw`flex-1 `}>
                    <Text>Hi</Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={tw` flex p-2 bg-gray-200 flex-row items-center gap-2`}>
                <TextInput onChangeText={setMessage} multiline placeholder='Enter a message' style={tw`p-3 bg-white rounded-lg flex-1`} />
                <TouchableOpacity onPress={sendMessage}>
                    <SendHorizonal style={tw`h-6 w-6 text-red-500`} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Conversation