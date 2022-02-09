import React, { useState } from 'react';
import { View, StyleSheet, Platform, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import GetLocation from 'react-native-get-location';
import { Spinner } from 'native-base';

import { MAP_BOX_TOKEN, APP_DOMAIN } from '@env';

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

    const handleRegionChange = (region) => {
        const longitude = region.geometry.coordinates[0];
        const latitude = region.geometry.coordinates[1];
        setCorrdinates([longitude, latitude]);
    }

    if (isFetchingAllowed) {

        return (
            <View style={styles.pageContainer}>
                <View style={styles.mapContainer}>
                    <MapboxGL.MapView style={styles.map}
                        onRegionDidChange={handleRegionChange}>

                        <MapboxGL.Camera zoomLevel={15} centerCoordinate={coordinates} />
                        <MapboxGL.MarkerView id="add-mechanic-annotation" coordinate={coordinates}>
                            <View>
                                <View style={styles.mechanicMarkerContainer}>
                                    <Image
                                        source={{ uri: `${APP_DOMAIN}/static/images/add_mechanic_marker.png` }}
                                        style={styles.markupImage}
                                    />
                                </View>
                            </View>
                        </MapboxGL.MarkerView>

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
    },
    mechanicMarkerContainer: {
        alignItems: 'center',
        width: 60,
        backgroundColor: 'transparent',
        height: 70,
    },
    markupImage: {
        width: 20,
        height: 30,
        resizeMode: 'cover'
    }
})



export default AddMechanic;