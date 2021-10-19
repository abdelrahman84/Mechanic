import React, { useState } from 'react';
import type { Node } from 'react';
import { View } from 'react-native';


// 3rd party
import axios from 'axios';
import Toast from 'react-native-toast-message';

import { API_URL } from "@env";
import RegisterForm from '../UI_Components/RegisterForm';

const Register: () => Node = ({ navigation }) => {

    const [loading, toggleLoading] = useState(false);

    const handleRegister = (userData) => {

        toggleLoading(true);
        axios.post(API_URL + 'users', userData).then((response) => {
            toggleLoading(false);
            Toast.show({
                text1: 'success',
                text2: 'Thank you for registering! Please check your email to verify your account',
                type: 'success',
                visibilityTime: 4000
            })
            navigation.navigate('Login')
        }).catch((error) => {
            Toast.show({
                text1: 'error',
                text2: JSON.stringify(error.response.data),
                type: 'error',
                visibilityTime: 4000
            })
            toggleLoading(false);
        })
    }

    const navigateToLogin = () => {
        navigation.navigate('Login')
    }


    return (

        <View>

        <RegisterForm onNavigateToLogin={navigateToLogin} onFormSumbit={handleRegister}
          isLoading={loading}/>
            
        </View>
    )
}



export default Register;