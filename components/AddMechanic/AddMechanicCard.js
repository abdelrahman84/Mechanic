import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

const AddMechanicCard: () => Node = ({ }) => {

    return (
        <Card containerStyle={styles.addMechanicCard}>
            <Card.Title>Add Mechanic</Card.Title>

        </Card>
    )

}

const styles = StyleSheet.create({
    addMechanicCard: {
        marginLeft: 0,
        marginRight: 0,
    }
})

export default AddMechanicCard;