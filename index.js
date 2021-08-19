/**
 * @format
 */
 import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { Provider } from 'react-redux'; 
import { createStore } from 'redux';
import Toast from 'react-native-toast-message';

import rootReducer from './store/reducers';


const store = createStore(rootReducer);

const RNRedux = () => (
    <Provider store={store}>
         <App/>
         <Toast ref={(ref) =>Toast.setRef(ref)} />
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
