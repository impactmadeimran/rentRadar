import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import tw from 'twrnc'
interface CustomSelectProps {
    options: string[];
    onSelect: (option: string) => void;
    selectedOption: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onSelect, selectedOption = "" }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelectOption = (option: string) => {
        onSelect(option);
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={tw`border border-gray-200 p-2 rounded`}>
                <Text style={tw`${selectedOption === "" ? "text-gray-400" : ""}`}>{selectedOption === "" ? "Select" : selectedOption}</Text>
            </TouchableOpacity>
            <Modal animationType="fade" visible={modalVisible} transparent={true}>
                <TouchableOpacity
                    style={styles.modalBackground}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => handleSelectOption(option)}
                                style={styles.optionItem}
                            >
                                <Text>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    selectButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        minWidth: 250,
    },
    optionItem: {
        padding: 10,
    },
});

export default CustomSelect;
