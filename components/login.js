import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Input, Button } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { API_URL } from "@env";
import { accessToken, loginUser } from '../store/actions';

const LoginValidation = yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email addresss')
        .required('Email address is required'),
    password: yup
        .string()
        .required('Password is required')

})


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

    const navigateToLogin = () => {
        navigation.navigate('Register')
    }


    return (
        <View style={styles.loignContainer}>
            <Formik
                validationSchema={LoginValidation}
                initialValues={{ email: '', password: '' }}
                onSubmit={values => handleLogin(values)}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                    <View style={styles.loginForm}>

                        <Input
                            placeholder='email'
                            label='Email'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType='email-address'
                            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                        />
                        {(errors.email && touched.email) &&
                            <Text style={styles.inputError}>{errors.email}</Text>
                        }

                        <Input
                            placeholder='password'
                            label='Password'
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={true}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        />
                        {(errors.password && touched.password) &&
                            <Text style={styles.inputError}>{errors.password}</Text>
                        }

                        <Button
                            title='Login'
                            onPress={handleSubmit}
                            buttonStyle={styles.submitBtn}
                            disabled={!isValid || loading}
                        />

                        <View style={styles.registerLinkContainer}>
                            <Text>New user? </Text>
                            <Text style={styles.registerLink} onPress={navigateToLogin}>Register</Text>
                        </View>

                    </View>

                )}

            </Formik>


        </View>
    )
}

const styles = StyleSheet.create({
    loignContainer: {
        padding: 10,
        backgroundColor: 'white',
        elevation: 10,
        display: 'flex',
        flex: 1,
    },
    loginForm: {
        display: 'flex',
        flex: 1,
    },
    inputError: {
        color: 'red',
    },
    submitBtn: {
        marginTop: '90%',
    },
    registerLinkContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        marginLeft: 'auto',
    },
    registerLink: {
        color: 'blue'
    }
})


export default Login;

