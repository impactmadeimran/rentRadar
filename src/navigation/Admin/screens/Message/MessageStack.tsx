import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AllMessages from '../../../../Screens/Admin/Message/components/AllMessages/AllMessages'
// import Conversation from '../../../../Screens/Admin/Message/components/Conversation/Conversation'
// import ConversationHeader from '../../../../components/ConversationHeader/ConversationHeader'

const Stack = createNativeStackNavigator()

const MessageStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="AllMessages" component={AllMessages} options={{
                headerTitle: 'Messages',
            }} />
            {/* <Stack.Screen name="Conversation" component={Conversation}
                options={({ route }) => ({
                    headerTitle: () => <ConversationHeader route={route} />,
                    headerBackVisible: true
                })}

            /> */}
        </Stack.Navigator>
    )
}

export default MessageStack