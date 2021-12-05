import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { ListItem, Text, Icon } from 'react-native-elements';
import { Dimensions } from 'react-native';

import BackContainer from '../UI_Components/BackContainer';

const windowHeight = Dimensions.get('window').height;

const Profile: () => Node = ({ navigation }) => {

    const user = useSelector(state => state.user);

    const handleNavigation = (routeName) => {
        navigation.navigate(routeName);
    }

    const profileItems =
        <View>

            <ListItem key='name' onPress={() => handleNavigation('EditName')}>
                <ListItem.Content style={styles.listItemContainer} >
                    <View style={styles.leftListItem}>
                        <Icon type='font-awesome' name='user-circle' />

                        <View style={styles.menuItem}>
                            <Text h4>Full Name</Text>
                            <Text style={styles.menuTitle}
                            >
                                {user.name}
                            </Text>
                        </View>

                    </View>
                    <Icon type='font-awesome' name='wrench' style={styles.updateIcon} />
                </ListItem.Content>
            </ListItem>

            <ListItem key='email'>
                <ListItem.Content>
                    <View style={styles.leftListItem}>
                        <Icon name='email' />

                        <View style={styles.menuItem}>
                            <Text h4>Email</Text>
                            <Text style={styles.menuTitle}
                            >
                                {user.email}
                            </Text>
                        </View>
                    </View>
                </ListItem.Content>
            </ListItem>


            <ListItem key='phone' bottomDivider>
                <ListItem.Content>
                    <View style={styles.leftListItem}>
                        <Icon name='phone' />

                        <View style={styles.menuItem}>
                            <Text h4>Phone</Text>
                            <Text style={styles.menuTitle}
                            >
                                {user.phone}
                            </Text>
                        </View>
                    </View>
                </ListItem.Content>
            </ListItem>

            <ListItem key='password' onPress={() => handleNavigation('ChangePassword')}>
                <ListItem.Content style={styles.listItemContainer} >
                    <View style={styles.leftListItem}>
                        <Icon type='font-awesome' name='lock' />

                        <View style={styles.menuItem}>
                            <Text h4>Password</Text>
                            <Text style={styles.menuTitle}
                            >
                                change password
                            </Text>
                        </View>

                    </View>
                    <Icon type='font-awesome' name='wrench' style={styles.updateIcon} />
                </ListItem.Content>
            </ListItem>

        </View>


    return (
        <View style={styles.profileForm}>
            <BackContainer navigation={navigation} pageName='Profile' />
            {profileItems}
        </View>
    )
}

const styles = StyleSheet.create({
    profileForm: {
        backgroundColor: 'white',
        minHeight: windowHeight,
    },
    listItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftListItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItem: {
        marginLeft: 20,
    },
    updateIcon: {
        alignItems: 'flex-end',
    },
    menuTitle: {
        color: 'grey',
    }
})



export default Profile;

