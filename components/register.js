import React from 'react';
import type { Node } from 'react';
import { View, StyleSheet, Text } from 'react-native';


// 3rd party
import { Formik } from 'formik';
import { Input, Button } from 'react-native-elements';
import * as yup from 'yup';

const PHONE_NUM_MIN_DIGITS = 11;

const registerValidation = yup.object().shape({
    first_name: yup
        .string()
        .required('First name is required'),
    last_name: yup
        .string()
        .required('Last name is required'),
    username: yup
        .string()
        .required('username is required'),
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

function registerUser(userData) {
    console.log(userData);
}


const Register: () => Node = () => {

    return (

        <View style={styles.registerContainer}>

            <Formik
                validationSchema={registerValidation}
                initialValues={{ first_name: '', last_name: '', username: '', email: '', phone: '' }}
                onSubmit={values => registerUser(values)}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                    <>

                        <Input
                            placeholder='fist name'
                            label='First name'
                            onChangeText={handleChange('first_name')}
                            onBlur={handleBlur('first_name')}
                            value={values.first_name}
                            style={styles.input}
                        />
                        {(errors.first_name && touched.first_name) &&
                            <Text style={styles.inputError}>{errors.first_name}</Text>
                        }

                        <Input
                            placeholder='last name'
                            label='Last name'
                            onChangeText={handleChange('last_name')}
                            onBlur={handleBlur('last_name')}
                            value={values.last_name}
                        />
                        {(errors.last_name && touched.last_name) &&
                            <Text style={styles.inputError}>{errors.last_name}</Text>
                        }

                        <Input
                            placeholder='username'
                            label='Username'
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                        {(errors.username && touched.username) &&
                            <Text style={styles.inputError}>{errors.username}</Text>
                        }

                        <Input
                            placeholder='email'
                            label='Email'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType='email-address'
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
                        />
                        {(errors.phone && touched.phone) &&
                            <Text style={styles.inputError}>{errors.phone}</Text>
                        }

                        <Button
                            title='Register'
                            onPress={handleSubmit}
                            style={styles.submitBtn}
                            disabled={!isValid}
                        />
                    </>

                )}

            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    registerContainer: {
        padding: 10,
        backgroundColor: 'white',
        elevation: 10,
    },
    input: {

    },
    inputError: {
        color: 'red',
    }
})

export default Register;