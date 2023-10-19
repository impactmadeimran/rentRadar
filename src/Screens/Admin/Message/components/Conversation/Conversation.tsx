import { View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../../../../../../utils'
import tw from 'twrnc'
import { SendHorizonal } from 'lucide-react-native'
import { useUserContext } from '../../../../../../src/context/UserContext'
import _ from 'lodash'
import Loader from '../../../../../../src/components/Loader/Loader'

const Conversation = ({ route }: any) => {
    const { tokenDecoded: me } = useUserContext()
    const [convoId, setConvoId] = useState('')
    const [message, setMessage] = useState('')
    const [webS, setWebS] = useState<WebSocket>()
    const [allChats, setAllChats] = useState<any[]>([])
    const user = route.params?.params;
    const scrollViewRef = useRef<any>();

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

    const getConvo = async () => {
        const res = await api.get(`/chat/${convoId}/`)
        return res.data
    }

    const { data: convoData, isLoading } = useQuery({
        queryKey: ['getConvo', convoId, data],
        queryFn: getConvo,
        onSuccess: (data) => {
            setAllChats(data?.message_set)
        },
        onError: (err) => console.log(err)
    })





    useEffect(() => {
        const ws: WebSocket = new WebSocket(`ws://206.81.18.243:5555/ws/chat/${convoId}/`);
        if (convoId) {

            ws.onopen = () => {
                console.log('connected')
            }
            // console.log('convoid', convoId)
            ws.onmessage = e => {
                // a message was received
                console.log(e.data);
                setAllChats((prev) => [...prev, JSON.parse(e.data)])
            };

            ws.onerror = e => {
                // an error occurred
                console.log(e);
            };

            ws.onclose = e => {
                // connection closed
                console.log(e.code, e.reason);
            };
        }
        setWebS(ws)
    }, [convoId])

    const messageToSend = {
        message: message,
        sender: me?.user_id
    }

    const sendMessage = () => {
        if (message !== "") {
            webS?.send(JSON.stringify(messageToSend))
            setMessage('')
        }
    }

    console.log(convoData)


    if (isLoading) return <Loader />


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} style={tw`flex flex-1  h-full`}>
            <View>
            </View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView ref={scrollViewRef} style={tw`flex-1 bg-white `} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
                    {
                        allChats?.map((chat, index) => {
                            return (
                                <View key={index} style={tw`flex-row items-center justify-${chat.sender === me?.user_id ? 'end' : 'start'} p-2`}>
                                    <View style={tw`bg-gray-100 p-2 rounded-xl ${chat.sender === me?.user_id ? 'bg-red-500 ' : 'bg-gray-200'}`}>
                                        <Text style={tw`${chat.sender === me?.user_id ? "text-white" : "text-gray-600"} font-semibold `}>{chat?.text}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </TouchableWithoutFeedback>
            <View style={tw` flex p-2 bg-white flex-row items-center gap-2 pb-10`}>
                <TextInput value={message} onChangeText={setMessage} multiline placeholder='Enter a message' style={tw`p-3 border border-gray-300 rounded-2xl flex-1`} />
                {message.trim()?.length >= 1 && <TouchableOpacity onPress={sendMessage} >
                    <SendHorizonal style={tw`h-6 w-6 text-red-500`} />
                </TouchableOpacity>}
            </View>
        </KeyboardAvoidingView>
    )
}

export default Conversation