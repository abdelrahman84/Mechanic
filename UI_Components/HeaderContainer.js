import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, ListItem, Text } from 'react-native-elements';
import { Icon } from 'react-native-elements';

const HeaderContainer: () => Node = ({ onNavigateChange, onLogout }) => {

    const [rightListemVisible, setRightListemVisible] = useState(false);

    const [leftListemVisible, setLeftListemVisible] = useState(false);

    const toggleRightListItem = () => {
        setLeftListemVisible(false);
        setRightListemVisible(value => !value)
    }

    const toggleLeftListItem = () => {
        setRightListemVisible(false);
        setLeftListemVisible(value => !value)
    }

    const centerComponent = <Icon name='home' color='white' testID='home-icon' onPress={() => onNavigateChange('Dashboard')} />

    const rightComponent = <Icon type='font-awesome' name='ellipsis-v' color='white' testID='right-icon' onPress={() => toggleRightListItem()} />

    const leftComponent = <Icon name='menu' color='white' testID='left-icon' onPress={() => toggleLeftListItem()} />

    const logoutCallback = () => {
        toggleRightListItem();
        onLogout();
    }


    const rightListItem =
        <View testID='right-list-item'>
            <ListItem key='logout' onPress={() => logoutCallback()} testID='logout-item'>
                <ListItem.Content >
                    <View style={styles.rightListItem}>
                        <Text
                        >
                            Logout
                        </Text>
                        <Icon name='logout' style={styles.rightMenuIcon} />
                    </View>
                </ListItem.Content>
            </ListItem>
        </View>

    const leftListItem =
        <View testID='left-list-item'>
            <ListItem key='profile' onPress={() => onNavigateChange('Settings')} testID='profile-item'>
                <ListItem.Content>
                    <View style={styles.leftListItem}>
                        <Icon type='font-awesome' name='user' style={styles.leftMenuIcon} />
                        <Text
                        >
                            Profile
                        </Text>
                    </View>
                </ListItem.Content>
            </ListItem>
        </View>

    return (
        <View style={styles.HeaderContainer}>
            <Header
                leftComponent={leftComponent}
                centerComponent={centerComponent}
                rightComponent={rightComponent}
            />
            {rightListemVisible && rightListItem}
            {leftListemVisible && leftListItem}

        </View>
    )

}

const styles = StyleSheet.create({
    rightListItem: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    rightMenuIcon: {
        marginLeft: 5,
    },
    leftListItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftMenuIcon: {
        marginRight: 5,
    }
})

export default HeaderContainer;