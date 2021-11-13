import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Text } from 'react-native-elements';
import { Icon } from 'react-native-elements';

const BackContainer: () => Node = ({ navigation: { goBack }, pageName }) => {

    const leftComponent = <View style={styles.leftComponent}><Icon type='font-awesome' name='long-arrow-left' color='white' onPress={() => goBack()} />
        <Text h4 style={styles.headerIcon}>{pageName}</Text>
    </View>

    return (
        <View>
            <Header
                placement="left"
                leftComponent={leftComponent}
            />

        </View>
    )

}

const styles = StyleSheet.create({
    leftComponent: {
        alignItems: 'center',
        flexDirection: 'row',

    },
    headerIcon: {
        color: 'white',
        marginLeft: 35,
    },
})

export default BackContainer;