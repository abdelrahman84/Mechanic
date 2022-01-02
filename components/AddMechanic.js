import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import GetLocation from 'react-native-get-location';
import { Spinner } from 'native-base';

import { MAP_BOX_TOKEN } from '@env';

MapboxGL.setAccessToken(MAP_BOX_TOKEN);

const AddMechanic: () => Node = ({ navigation }) => {

    const [coordinates, setCorrdinates] = useState([78.9629, 20.5937]);

    const [isFetchingAllowed, setFetchingAllowed] = useState(false);

    React.useEffect(() => checkMapBoxPermssion(), []);

    const checkMapBoxPermssion = async () => {

        if (Platform.OS !== 'android') {

            setFetchingAllowed(true);
            return;
        }

        const isGranted = await MapboxGL.requestAndroidLocationPermissions();

        MapboxGL.locationManager.start();

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000
        })
            .then(location => {
                setCorrdinates([location.longitude, location.latitude]);
                setFetchingAllowed(isGranted);

            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message)
            })

    }

    if (isFetchingAllowed) {

        return (
            <View style={styles.pageContainer}>
                <View style={styles.mapContainer}>
                    <MapboxGL.MapView style={styles.map} >

                        <MapboxGL.Camera zoomLevel={15} centerCoordinate={coordinates} />
                        <MapboxGL.PointAnnotation id="add-mechanic-annotation" coordinate={coordinates} />

                    </MapboxGL.MapView>
                </View>
            </View>
        )
    }

    if (!isFetchingAllowed) {
        return (
            <View style={styles.pageContainer}>
                <Spinner />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapContainer: {
        height: '100%',
        width: '100%',
    },
    map: {
        flex: 1,
    }
})



export default AddMechanic;