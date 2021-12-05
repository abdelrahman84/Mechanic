import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Dimensions } from 'react-native';
import { API_URL } from "@env";
import Toast from 'react-native-toast-message';

import BackContainer from '../UI_Components/BackContainer';
import customAxios from '../helpers/httpInterceptor';
import ChangePasswordForm from '../UI_Components/ChangePasswordForm';

const windowHeight = Dimensions.get('window').height;

const ChangePassword: () => Node = ({ navigation }) => {

    const token = useSelector(state => state.token);

    const [loading, toggleLoading] = useState(false);

    const handlePasswordChange = (userData) => {

        toggleLoading(true);
        customAxios(token, navigation).post(API_URL + 'changePassword', userData).then((response) => {

            Toast.show({
                text1: 'success',
                text2: 'Password updated successfully',
                type: 'success',
                visibilityTime: 4000
            })

            navigation.goBack();

            toggleLoading(false);

        }).catch((error) => {
            console.log(error.error)
            Toast.show({
                text1: 'error',
                text2: JSON.stringify(error.response.data),
                type: 'error',
                visibilityTime: 4000
            })
            toggleLoading(false);
        })
    }

    return (
        <View style={styles.changePasswordContainer}>
            <BackContainer navigation={navigation} pageName='Change password' />
            <ChangePasswordForm onFormSubmit={handlePasswordChange} isLoading={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    changePasswordContainer: {
        backgroundColor: 'white',
        minHeight: windowHeight,
    },
})



export default ChangePassword;

