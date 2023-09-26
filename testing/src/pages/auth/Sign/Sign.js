import React, { useState } from "react";
import { View, Text } from 'react-native';
import styles from './Sign.style';
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";
import authErrorMessageParsers from "../../../Utils/authErrorMessageParsers";

import auth from '@react-native-firebase/auth';

import Input from '../../../components/Input';
import Button from "../../../components/Button/Button";

const initalFormValues = {
    usermail: '',
    password: '',
    repassword: '',
}

function Sign({ navigation }) {
const [loading,setLoading] = useState(false);

    function handeLogin() {
        navigation.goBack()
    }

    async function handleFormSubmit(formValues) {
        if (formValues.password !== formValues.repassword) {
            showMessage({
                message: "Şifreler Uyuşmuyor",
                type: 'danger'
            })
            return;
        }

        try {
           await auth().createUserWithEmailAndPassword(formValues.usermail,  formValues.repassword)
            showMessage({
                message: "Kullanıcı Oluşturuldu !",
                type: 'success',
            });
            navigation.navigate('LoginPage')
            setLoading(false);
        } catch (error) {
            setLoading(false);
    }
}

return (
    <View style={styles.container} >
        <Text style={styles.header} >A$AP</Text>
        <Formik initialValues={initalFormValues} onSubmit={handleFormSubmit}>
            {({ values, handleChange, handleSubmit }) => (
                <View>
                    <Input onType={handleChange('usermail')} value={values.usermail} placeholder="E Postanızı giriniz.." />
                    <Input onType={handleChange('password')} value={values.password} placeholder="Şifrenizi giriniz.." secureTextEntry={true}/>
                    <Input onType={handleChange('repassword')} value={values.repassword} placeholder="Şifrenizi tekrar giriniz.." secureTextEntry={true}/>
                    <Button text='Giriş Yap' theme="primary" onPress={handleSubmit} loading={loading}/>
                </View>
            )}
        </Formik>

        <Button text='Geri' theme="secondary" onPress={handeLogin} />
    </View>
)
}

export default Sign;