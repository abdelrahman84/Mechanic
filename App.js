import React from 'react';
import type { Node } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';

// app
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import StartPage from './components/StartPage';
import Profile from './components/Profile';

const Stack = createStackNavigator();

const App: () => Node = () => {

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="StartPage" component={StartPage} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};


export default App;
