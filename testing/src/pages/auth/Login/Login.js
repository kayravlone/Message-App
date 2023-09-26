import React, { useState } from "react";
import { View, Text, Alert } from 'react-native'; // Eklenen Alert
import styles from './Login.style';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";

import authErrorMessageParsers from "../../../Utils/authErrorMessageParsers";

import Input from '../../../components/Input';
import Button from "../../../components/Button/Button";

const initialFormValues = {
    usermail: '',
    password: '',
}

function Login({ navigation }) {
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        navigation.navigate('SignPage');
    }

    async function handleFormSubmit(formValues) {
        if (formValues.usermail === '') { // usermail kontrolü düzeltildi
            Alert.alert('Hata', 'E-posta adresinizi giriniz.');
            return;
        } else if (formValues.password === '') { // password kontrolü düzeltildi
            Alert.alert('Hata', 'Şifrenizi giriniz.');
            return;
        }
          
        setLoading(true);
    
        try {
            await auth().signInWithEmailAndPassword(
                formValues.usermail,
                formValues.password,
            );
            navigation.navigate('MessagesPage')
            setLoading(false);
        } catch (error) {
            showMessage({
                message: authErrorMessageParsers(error.code) ,
                type: 'danger',
            });
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>A$AP</Text>
            <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                {({ values, handleChange, handleSubmit }) => (
                    <>
                        <Input onType={handleChange('usermail')} value={values.usermail} placeholder="E-Postanızı giriniz.."  />
                        <Input onType={handleChange('password')} value={values.password} placeholder="Şifrenizi giriniz.." secureTextEntry={true}/>
                        <Button text='Giriş Yap' theme="primary" onPress={handleSubmit} loading={loading}   />
                    </>
                )}
            </Formik>
            <Button text='Kayıt Ol' theme="secondary" onPress={handleSignUp} />
        </View>
    )
}

export default Login;
