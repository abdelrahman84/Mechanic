import React from 'react';
import type { Node } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

// app
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';

const Stack = createStackNavigator();

const App: () => Node = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
