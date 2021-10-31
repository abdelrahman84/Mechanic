import React from 'react';
import type { Node } from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { accessToken, loginUser } from '../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';


const StartPage: () => Node = ({ navigation }) => {

    const dispatch = useDispatch();

    React.useEffect(() => checkLocalSotrage(), []);

    const checkLocalSotrage = async () => {

        const user = await AsyncStorage.getItem('USER');
        const token = await AsyncStorage.getItem('TOKEN');

        if (user && token) {
            const userObject = JSON.parse(user);
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
            return;
        }

        // If no pervious session
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Login' },
                ],
            })
        );

    }

    return (
        <View>

        </View>
    );
};


export default StartPage;
