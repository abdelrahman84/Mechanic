import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { API_URL } from "@env";

import { accessToken, loginUser } from '../store/actions';
import LoginForm from '../UI_Components/LoginForm';


const Login: () => Node = ({ navigation }) => {

    const [loading, toggleLoading] = useState(false);

    const dispatch = useDispatch();

    const handleLogin = (userData) => {

        toggleLoading(true);
        axios.post(API_URL + 'login', userData).then((response) => {
            const user = JSON.parse(response.data.user)
            const token = response.data.access;

            dispatch(loginUser(user));
            dispatch(accessToken(token))

            storeUserData(token);

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

    const storeUserData = async (token) => {
        try {
            await AsyncStorage.setItem('TOKEN', token)
        } catch (e) {
            Toast.show({
                text1: 'error',
                text2: 'Something went wrong, please try again',
                type: 'error',
                visibilityTime: 4000
            })
        }
    }

    const navigateToRegister = () => {
        navigation.navigate('Register')
    }

    return (
        <View style={styles.loignContainer}>
            <LoginForm onNavigateToRegister={navigateToRegister} onFormSubmit={handleLogin}
                isLoading={loading} />

        </View>
    )
}

const styles = StyleSheet.create({
    loignContainer: {
    }
})

export default Login;

