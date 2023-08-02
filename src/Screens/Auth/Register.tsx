import { Picker } from "@react-native-picker/picker"
import { useState } from "react"
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import tw from 'twrnc'
import CustomSelect from "../../components/Select/CustomSelect"

const Register = ({ navigation }: any) => {
    const [gender, setGender] = useState('male')
    const [showGenderPick, setShowGenderPick] = useState(false)
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelect = (option: string) => {
        setSelectedOption(option);
    };
    return (
        <SafeAreaView style={tw`flex flex-1 items-center justify-center w-full `}>
            <ScrollView style={tw`  w-full px-5 `}>
                <View style={tw`px-6 bg-slate-50 py-10 rounded-lg`}>
                    <Text style={tw`text-center text-2xl font-semibold`}>Let's Get Started</Text>
                    <Text style={tw`text-center text-gray-500 text-sm `}>Create an account</Text>
                    <View style={tw`w-full mt-7 flex gap-4`}>
                        <TextInput style={tw`border border-gray-200 p-2 rounded`} placeholder="Email" />
                        <TextInput style={tw`border border-gray-200 p-2 rounded`} placeholder="First name" />
                        <TextInput style={tw`border border-gray-200 p-2 rounded`} placeholder="Last name" />
                        <TextInput style={tw`border border-gray-200 p-2 rounded`} placeholder="Business name" />
                        <TextInput style={tw`border border-gray-200 p-2 rounded`} placeholder="Phone Number" />
                        <TextInput style={tw`border border-gray-200 p-2 rounded`} placeholder="Password" />
                        <TextInput onPressIn={() => setShowGenderPick(true)} style={tw`border border-gray-200 p-2 rounded`} placeholder="Gender" />
                        <CustomSelect
                            options={['male', 'female', 'other']}
                            onSelect={handleSelect}
                            selectedOption={selectedOption}
                        />
                        <TextInput style={tw`border border-gray-200 p-2 rounded`} placeholder="Date of birth" />
                        <TextInput style={tw`border border-gray-200 p-2 rounded`} placeholder="Account type" />
                        <View style={tw`flex flex-row justify-end`}>
                            <Text style={tw`text-xs font-light`}>Forgot Password?</Text>
                        </View>
                        <TouchableOpacity style={tw`bg-red-500 p-2 rounded`}>
                            <Text style={tw`text-center text-white font-bold`}>REGISTER</Text>
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
        </SafeAreaView >
    )
}

export default Register