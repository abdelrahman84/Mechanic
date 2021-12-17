import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AddMechanic from './AddMechanic';
import Dashboard from './Dashboard';



const Tab = createBottomTabNavigator();

const HomeComponent: () => Node = () => {

    return (
        <NavigationContainer independent>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'home'
                        }

                        if (route.name === 'Add Mechanic') {
                            iconName = 'engineering';
                        }
                        return <Icon name={iconName} size={size} color={color} />
                    }
                })}>

                <Tab.Screen name="Home" component={Dashboard} />
                <Tab.Screen name="Add Mechanic" component={AddMechanic} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}


export default HomeComponent;