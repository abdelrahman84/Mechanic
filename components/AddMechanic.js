import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Dimensions } from 'react-native';


const windowHeight = Dimensions.get('window').height;

const AddMechanic: () => Node = ({ navigation }) => {

    return (
        <View style={styles.addMechanicContainer}>
            <Text h4>Add mechanic</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    addMechanicContainer: {
        backgroundColor: 'white',
        minHeight: windowHeight,
    },
})



export default AddMechanic;