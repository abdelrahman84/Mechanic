import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const customAxios = (token, navigation) => {

    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    }, function (error) {
        console.log(error.response.status)
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        // handle 401 errors
        if (error.response.status === 401) {
            removeUserData(navigation);
        }
        return Promise.reject(error);
    })

    return axiosInstance;
};

const removeUserData = async (navigation) => {
    await AsyncStorage.removeItem('USER');
    await AsyncStorage.removeItem('TOKEN');
    navigation.navigate('Login');
}

export default customAxios;