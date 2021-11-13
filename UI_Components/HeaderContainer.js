import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, ListItem, Text, Icon } from 'react-native-elements';

const HeaderContainer: () => Node = ({ onNavigateChange, onLogout }) => {

    const [leftListemVisible, setLeftListemVisible] = useState(false);

    const toggleLeftListItem = () => {
        setLeftListemVisible(value => !value)
    }

    const centerComponent = <Text h4 style={styles.headerIcon}>Mechanic</Text>

    const leftComponent = <Icon name='menu' color='white' testID='left-icon' onPress={() => toggleLeftListItem()} />

    const logoutCallback = () => {
        toggleLeftListItem();
        onLogout();
    }

    const leftListItem =
        <View testID='left-list-item'>

            <ListItem key='profile' onPress={() => { onNavigateChange('Profile'); toggleLeftListItem() }} testID='profile-item' bottomDivider>
                <ListItem.Content>
                    <View style={styles.leftListItem}>
                        <Icon type='font-awesome' name='user' />
                        <Text style={styles.menuTitle}
                        >
                            Profile
                        </Text>
                    </View>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>

            <ListItem key='logout' onPress={() => logoutCallback()} testID='logout-item'>
                <ListItem.Content>
                    <View style={styles.leftListItem}>
                        <Icon name='logout' style={styles.leftMenuIcon} />
                        <Text style={styles.menuTitle}
                        >
                            Logout
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
            />
            {leftListemVisible && leftListItem}

        </View>
    )

}

const styles = StyleSheet.create({
    headerIcon: {
        color: 'white',
    },
    leftListItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuTitle: {
        marginLeft: 20,
    }
})

export default HeaderContainer;