import React from 'react';
import type { Node } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dimensions } from 'react-native';


// 3rd party
import { Formik } from 'formik';
import { Input, Button } from 'react-native-elements';
import * as yup from 'yup';

const windowHeight = Dimensions.get('window').height;

const PHONE_NUM_MIN_DIGITS = 11;

const registerValidation = yup.object().shape({
    name: yup
        .string()
        .required('Name is required'),
    email: yup
        .string()
        .email('Please enter a valid email addresss')
        .required('Email address is required'),
    phone: yup
        .string()
        .matches(/^(?=\d{11,}$)(01)\d/, 'Please enter a valid number')
        .min(PHONE_NUM_MIN_DIGITS, ({ min }) => `Phone number must be ${min} digits`)
        .required('Phone number is required')

})

const RegisterForm: () => Node = ({ onNavigateToLogin, onFormSumbit, isLoading }) => {

    return (

        <View style={styles.registerContainer}>

            <Formik
                validationSchema={registerValidation}
                initialValues={{ name: '', email: '', phone: '' }}
                onSubmit={values => onFormSumbit(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
                    <View style={styles.registerForm}>

                        <Input
                            placeholder='full name'
                            label='Full name'
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            style={styles.input}
                            testID='name'
                        />
                        {(errors.name && touched.name) &&
                            <Text style={styles.inputError}>{errors.name}</Text>
                        }

                        <Input
                            placeholder='email'
                            label='Email'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType='email-address'
                            testID='email'
                        />
                        {(errors.email && touched.email) &&
                            <Text style={styles.inputError}>{errors.email}</Text>
                        }

                        <Input
                            placeholder='phone number'
                            label='Phone number'
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                            keyboardType='numeric'
                            testID='phone'
                        />
                        {(errors.phone && touched.phone) &&
                            <Text style={styles.inputError}>{errors.phone}</Text>
                        }

                        <Button
                            title='Register'
                            onPress={handleSubmit}
                            buttonStyle={styles.submitBtn}
                            disabled={!isValid || !dirty || isLoading}
                            testID="register-btn"
                        />
                        <View style={styles.loginLinkContainer}>
                            <Text>Already have an account? </Text>
                            <Text style={styles.loginLink} onPress={onNavigateToLogin}>Login</Text>
                        </View>

                    </View>

                )}

            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    registerContainer: {
        paddingTop: 50,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: 'white',
        elevation: 10,
        height: windowHeight,
    },
    registerForm: {
    },
    inputError: {
        color: 'red',
    },
    loginLinkContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        marginLeft: 'auto',
    },
    loginLink: {
        color: 'blue'
    }
})

export default RegisterForm;