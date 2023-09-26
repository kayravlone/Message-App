import React from "react";
import { View, TextInput } from 'react-native';
import styles from './Input.style';

function Input({ placeholder, onType, value, secureTextEntry }) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onChangeText={onType}
                value={value}
                secureTextEntry={secureTextEntry} // Şifre girişi için secureTextEntry ekleniyor
            />
        </View>
    )
}

export default Input;
