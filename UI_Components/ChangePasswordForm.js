import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dimensions } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Input, Button } from 'react-native-elements';

const windowHeight = Dimensions.get('window').height;

const changePasswordValidation = yup.object().shape({
    old_password: yup
        .string()
        .required('Old Password is required'),
    new_password: yup
        .string()
        .required('New Password is required'),
    confirm_password: yup
        .string()
        .required('Confirmation Password is required')
        .oneOf([yup.ref('new_password'), null], 'Password must match'),
})

const ChangePasswordForm: () => Node = ({ onFormSubmit, isLoading }) => {

    return (

        <View style={styles.changePasswordContainer}>
            <Formik
                validationSchema={changePasswordValidation}
                initialValues={{ old_password: '', new_password: '', confirm_password: '' }}
                onSubmit={values => onFormSubmit(values)}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
                    <View style={styles.changePasswordForm}>

                        <Input
                            placeholder='old password'
                            label='Old Password'
                            onChangeText={handleChange('old_password')}
                            onBlur={handleBlur('old_password')}
                            value={values.old_password}
                            secureTextEntry={true}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        />
                        {(errors.password && touched.password) &&
                            <Text style={styles.inputError}>{errors.password}</Text>
                        }

                        <Input
                            placeholder='new password'
                            label='New Password'
                            onChangeText={handleChange('new_password')}
                            onBlur={handleBlur('new_password')}
                            value={values.new_password}
                            secureTextEntry={true}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        />
                        {(errors.new_password && touched.new_password) &&
                            <Text style={styles.inputError}>{errors.new_password}</Text>
                        }

                        <Input
                            placeholder='confirmation password'
                            label='Confirmation Password'
                            onChangeText={handleChange('confirm_password')}
                            onBlur={handleBlur('confirm_password')}
                            value={values.confirm_password}
                            secureTextEntry={true}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        />
                        {(errors.confirm_password && touched.confirm_password) &&
                            <Text style={styles.inputError}>{errors.confirm_password}</Text>
                        }

                        <Button
                            title='Confirm'
                            onPress={handleSubmit}
                            buttonStyle={styles.submitBtn}
                            disabled={!isValid || !dirty || isLoading}
                            testID='submit-btn'
                        />

                    </View>

                )}

            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    changePasswordContainer: {
        backgroundColor: 'white',
        minHeight: windowHeight,
    },
    changePasswordForm: {
        paddingTop: 50,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: 'white',
        elevation: 10,
        minHeight: windowHeight,
    },
    inputError: {
        color: 'red',
    },
})



export default ChangePasswordForm;

