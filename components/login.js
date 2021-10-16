import React, { useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { API_URL } from "@env";
import { accessToken, loginUser } from '../store/actions';
import LoginForm from '../UI_Components/loginForm';


const Login: () => Node = ({ navigation }) => {

    const [loading, toggleLoading] = useState(false);

    const dispatch = useDispatch();

    const handleLogin = (userData) => {

        toggleLoading(true);
        axios.post(API_URL + 'login', userData).then((response) => {
            const user = JSON.parse(response.data.user)
            dispatch(loginUser(user));
            dispatch(accessToken(response.data.access))
            navigation.navigate('Dashboard')
            toggleLoading(false);
        }).catch((error) => {
            Toast.show({
                text1: 'error',
                text2: JSON.stringify(error.response.data.detail),
                type: 'error',
                visibilityTime: 4000
            })
            toggleLoading(false);
        })
    }

    const navigateToRegister = () => {
        navigation.navigate('Register')
    }

    return (
        <View>

            <LoginForm onNavigateToRegister={navigateToRegister} onFormSubmit={handleLogin}
                isLoading={loading} />

        </View>
    )
}

export default Login;

