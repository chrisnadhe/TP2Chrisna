import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, PermissionsAndroid, PermissionsIOS } from 'react-native';
import MapView, { PROVIDER_OSM } from 'react-native-maps';

function MapsScreen() {
  const [initialRegion, setInitialRegion] = useState({
    latitude: -6.17511,
    longitude: 106.82725,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });

  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    requestLocationPermission().then(hasPermission => {
      setHasLocationPermission(hasPermission);
    });
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const status = await PermissionsIOS.request('location');
      return status === 'authorized';
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_OSM}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={hasLocationPermission}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapsScreen;
