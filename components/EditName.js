import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Dimensions } from 'react-native';
import { API_URL } from "@env";
import Toast from 'react-native-toast-message';

import BackContainer from '../UI_Components/BackContainer';
import EditNameForm from '../UI_Components/EditNameForm';
import customAxios from '../helpers/httpInterceptor';
import { updateUserName } from '../store/actions';

const windowHeight = Dimensions.get('window').height;

const EditName: () => Node = ({ navigation }) => {

    const token = useSelector(state => state.token);

    const [loading, toggleLoading] = useState(false);

    const dispatch = useDispatch();

    const handleNameChange = (userData) => {

        toggleLoading(true);
        customAxios(token, navigation).put(API_URL + 'updateUser', userData).then((response) => {

            const updatedName = response.data.updated_name

            dispatch(updateUserName(updatedName));

            Toast.show({
                text1: 'success',
                text2: 'Name updated successfully',
                type: 'success',
                visibilityTime: 4000
            })

            navigation.goBack();

            toggleLoading(false);

        }).catch((error) => {
            Toast.show({
                text1: 'error',
                text2: 'Something went wrong, please try again',
                type: 'error',
                visibilityTime: 4000
            })
            toggleLoading(false);
        })
    }

    return (
        <View style={styles.editNameContainer}>
            <BackContainer navigation={navigation} pageName='Update full name' />
            <EditNameForm onFormSubmit={handleNameChange} isLoading={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    editNameContainer: {
        backgroundColor: 'white',
        minHeight: windowHeight,
    },
})



export default EditName;

