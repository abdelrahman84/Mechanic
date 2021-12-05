import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dimensions } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Input, Button } from 'react-native-elements';

const windowHeight = Dimensions.get('window').height;

const editNameValidation = yup.object().shape({
    name: yup
        .string()
        .required('Full name is required'),

})

const EditNameForm: () => Node = ({ onFormSubmit, isLoading }) => {

    return (

        <View style={styles.editNameContainer}>
            <Formik
                validationSchema={editNameValidation}
                initialValues={{ name: '' }}
                onSubmit={values => onFormSubmit(values)}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
                    <View style={styles.editNameForm}>

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
    editNameContainer: {
        backgroundColor: 'white',
        minHeight: windowHeight,
    },
    editNameForm: {
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



export default EditNameForm;

