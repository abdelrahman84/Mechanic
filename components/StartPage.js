import React from 'react';
import type { Node } from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { accessToken, loginUser } from '../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { API_URL } from "@env";

import customAxios from '../helpers/httpInterceptor';


const StartPage: () => Node = ({ navigation }) => {

    const dispatch = useDispatch();

    React.useEffect(() => checkLocalSotrage(), []);

    const checkLocalSotrage = async () => {

        const token = await AsyncStorage.getItem('TOKEN');

        if (token) {

            customAxios(token, navigation).get(API_URL + 'getUserData').then((response) => {

                const userObject = response.data.user;
                dispatch(loginUser(userObject));
                dispatch(accessToken(token))

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Dashboard' },
                        ],
                    })
                );
            }).catch((error) => {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Login' },
                        ],
                    })
                );

            })
        }

        // If no pervious session
        if (!token) {

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'Login' },
                    ],
                })
            );

        }
    }

    return (
        <View>

        </View>
    );
};


export default StartPage;
