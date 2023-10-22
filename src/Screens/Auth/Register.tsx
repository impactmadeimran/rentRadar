import { useCallback, useEffect, useRef, useState } from "react"
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, Platform, Alert, Keyboard, TouchableWithoutFeedback } from "react-native"
import tw from 'twrnc'
import CustomSelect from "../../components/Select/CustomSelect"
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import api from "../../../utils";
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";
import Loader from "../../../src/components/Loader/Loader";
import { useUserContext } from "../../../src/context/UserContext";

const Register = ({ navigation }: any) => {
    const { authenticate, setUserData, user } = useUserContext()

    const [date, setDate] = useState(null);
    const [gender, setGender] = useState('')
    const [type, setType] = useState("Personal")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [showAndroidDate, setShowAndroidDate] = useState(false)
    const [addBusName, setAddBusName] = useState({})


    const isIOS = Platform.OS === 'ios';
    const isAndroid = Platform.OS === 'android';

    const register = async () => {
        const res = await api.post('/auth/register/', {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            phone,
            user_type: type === 'Personal' ? 1 : 2,
            gender,
            ...addBusName,
            dob: moment(date).format('YYYY-MM-DD')
        })
        return res.data
    }

    const { mutate, isLoading } = useMutation({
        mutationKey: ['register_user'],
        mutationFn: register,
        onSuccess: (data) => {
            const decoded: any = jwt_decode(data?.jwt);
            if (decoded) {
                if (data?.jwt) {
                    authenticate?.(data?.jwt)
                    setUserData(data, decoded)
                    navigation.navigate('Home')
                } else {
                    Alert.alert('Error')
                }
            }
        },
        onError: (error) => {
            console.log('error', error)
        }
    })


    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const onDateChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        // console.log(moment(currentDate).format('YYYY MM d'))
        // if (isAndroid) { setShowAndroidDate(false) }
    };
    const handlePresentModalPress = useCallback(() => {
        isIOS && bottomSheetRef.current?.present();
        openDatePicker()
    }, []);


    useEffect(() => {
        if (type !== 'Personal') {
            setAddBusName({
                bus_name: businessName
            })
        }
    }, [type])

    const openDatePicker = () => {

        DateTimePickerAndroid.open({ display: 'calendar', mode: 'date', value: new Date(updatedDate), onChange: onDateChange, maximumDate: new Date(updatedDate) })
    }


    const currentDate = new Date();

    // Subtract 18 years from the current year
    // const updatedYear = currentDate.getFullYear() - 18;


    // Create a new Date object with the updated year
    const updatedDate = new Date(currentDate);

    if (isLoading) return <Loader />

    return (
        <SafeAreaView style={tw`flex flex-1 items-center justify-center w-full `}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <BottomSheetModalProvider>
                    <ScrollView style={tw`  w-full px-5 `}>
                        <View style={tw`px-6 bg-slate-50 py-10 rounded-lg mt-10`}>
                            <Text style={tw`text-center text-2xl font-semibold`}>Let's Get Started</Text>
                            <Text style={tw`text-center text-gray-500 text-sm `}>Create an account</Text>
                            <View style={tw`w-full mt-7 flex gap-4`}>
                                <SegmentedControl
                                    values={['Personal', 'Business']}
                                    selectedIndex={0}
                                    onChange={(event) => {
                                        setType(event.nativeEvent.value)
                                    }}
                                />
                                <TextInput onChangeText={setEmail} value={email} style={tw`border border-gray-200 p-2 rounded`} placeholder="Email" autoCapitalize={'none'} />
                                <View style={tw` flex-row w-full gap-2`}>
                                    <TextInput onChangeText={setFirstName} value={firstName} style={tw`border border-gray-200 p-2 rounded flex-1`} placeholder="First name" />
                                    <TextInput onChangeText={setLastName} value={lastName} style={tw`border border-gray-200 p-2 rounded flex-1`} placeholder="Last name" />
                                </View>
                                {type === "Business" && <TextInput onChangeText={setBusinessName} value={businessName} style={tw`border border-gray-200 p-2 rounded`} placeholder="Business name" />}
                                <TextInput keyboardType={'numeric'} onChangeText={setPhone} value={phone} style={tw`border border-gray-200 p-2 rounded`} placeholder="Phone Number" />
                                <TextInput onChangeText={setPassword} value={password} style={tw`border border-gray-200 p-2 rounded`} placeholder="Password" secureTextEntry={true} />
                                <CustomSelect
                                    placeholder="Gender"
                                    options={['male', 'female', 'other']}
                                    onSelect={setGender}
                                    selectedOption={gender}
                                />

                                <TouchableOpacity onPress={handlePresentModalPress} style={tw`border border-gray-200 p-2 rounded`} >
                                    {date !== null ? <Text> {moment(date).format('LL')}</Text> : <Text style={tw`text-gray-400`}>Date of birth</Text>}
                                </TouchableOpacity>


                                <BottomSheetModal
                                    ref={bottomSheetRef}
                                    index={1}
                                    snapPoints={['30%', '40%']}
                                    enablePanDownToClose
                                    // snapPoints={snapPoints}
                                    keyboardBehavior='interactive'
                                // onChange={handleSheetChanges}
                                >
                                    <View style={tw`flex items-end`}>
                                        <TouchableOpacity onPress={() => bottomSheetRef.current?.dismiss()}>
                                            <Text style={tw`px-4 text-blue-500 text-lg`}>Done</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <DateTimePicker maximumDate={new Date(updatedDate)} display='spinner' style={tw`border border-gray-200 p-2 rounded w-full`} mode="date" onChange={onDateChange} value={new Date(updatedDate)} />

                                </BottomSheetModal>
                                <View style={tw`flex flex-row justify-end`}>
                                    <Text style={tw`text-xs font-light`}>Forgot Password?</Text>
                                </View>
                                <TouchableOpacity style={tw`bg-red-500 p-2 rounded`}>
                                    <Text onPress={() => mutate()} style={tw`text-center text-white font-bold`}>REGISTER</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={tw`mt-10`}>
                                <View style={tw`flex flex-row justify-center`}>
                                    <Text style={tw`text-center text-xs`}>Already have an account? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                        <Text style={tw`font-semibold`}>Sign in</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </BottomSheetModalProvider>
            </TouchableWithoutFeedback>
        </SafeAreaView >
    )
}

export default Register
