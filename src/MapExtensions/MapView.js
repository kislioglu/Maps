import {PermissionsAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapModal from './MapModal';

export default function MapMain() {
  const [location, setLocation] = useState();
  const [mapType, setMapType] = useState('standard');
  const [showTransit, setShowTransit] = useState(false);
  const [trafficBoolean, setTrafficBoolean] = useState(false);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Maps needs access to your Location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      position => setLocation(position),
      error => console.error(error),
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const [region, setRegion] = useState({
    latitude: location?.coords?.latitude,
    longitude: location?.coords?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const refreshTraffic = () => {
    setRegion({
      ...region,
      latitude: region.latitude + 0.0001,
    });
  };

  useEffect(() => {
    const interval = setInterval(refreshTraffic, 60000);
    return () => clearInterval(interval);
  }, [region]);

  return (
    <View style={{flex: 1}}>
      {location ? (
        <View style={{flex: 1}}>
          <MapView
            provider={'google'}
            style={{flex: 1}}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsTraffic={trafficBoolean}
            customMapStyle={[
              {
                featureType: 'transit.station',
                stylers: [
                  {
                    visibility: `${showTransit ? 'on' : 'off'}`,
                  },
                ],
              },
            ]}
            mapType={mapType}>
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
          </MapView>

          <View style={{position: 'absolute', right: 10, top: 10}}>
            <MapModal
              mapType={mapType}
              setMapType={setMapType}
              trafficBoolean={trafficBoolean}
              setTrafficBoolean={setTrafficBoolean}
              showTransit={showTransit}
              setShowTransit={setShowTransit}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}
