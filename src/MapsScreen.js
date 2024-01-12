import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  PermissionsIOS,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Config from "react-native-config";

const apiKey = Config.REACT_APP_GOOGLE_MAPS_API_KEY;

function MapsScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const [initialRegion, setInitialRegion] = useState({
    latitude: -6.17511,
    longitude: 106.82725,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });

  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    requestLocationPermission()
      .then(setHasLocationPermission)
      .finally(() => setIsLoading(false));
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const status = await PermissionsIOS.request('location');
      return status === 'authorized';
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        apiKey={apiKey}
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
