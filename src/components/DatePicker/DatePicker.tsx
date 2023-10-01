import { View, Text } from 'react-native'
import React, { ReactNode, useCallback, useRef } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc'

interface Props {
    children: ReactNode;
}

const DatePicker = ({ children }: Props) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);
    return (

        <BottomSheetModal
            ref={bottomSheetRef}
            index={1}
            snapPoints={['49%', '50%', '80%']}
            enablePanDownToClose
            // snapPoints={snapPoints}
            keyboardBehavior='interactive'
        // onChange={handleSheetChanges}
        >
            <DateTimePicker display='spinner' style={tw`border border-gray-200 p-2 rounded w-full`} mode="date" value={new Date()} />

        </BottomSheetModal>
    )
}

export default DatePicker