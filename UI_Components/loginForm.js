import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Input, Button } from 'react-native-elements';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const LoginValidation = yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email addresss')
        .required('Email address is required'),
    password: yup
        .string()
        .required('Password is required')

})

const LoginForm: () => Node = ({ onNavigateToRegister, onFormSubmit, isLoading }) => {

    return (
        <View style={styles.loignContainer}>
            <Formik
                validationSchema={LoginValidation}
                initialValues={{ email: '', password: '' }}
                onSubmit={values => onFormSubmit(values)}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
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
                            disabled={!isValid || !dirty || isLoading}
                            testID='login-btn'
                        />

                        <View style={styles.registerLinkContainer}>
                            <Text>New user? </Text>
                            <Text style={styles.registerLink} onPress={onNavigateToRegister}>Register</Text>
                        </View>

                    </View>

                )}

            </Formik>


        </View>
    )
}

const styles = StyleSheet.create({
    loginForm: {
        padding: 10,
        backgroundColor: 'white',
        elevation: 10,
        minHeight: windowHeight,
    },
    inputError: {
        color: 'red',
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


export default LoginForm;