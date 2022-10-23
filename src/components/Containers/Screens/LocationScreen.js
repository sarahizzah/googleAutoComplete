import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from '../../StylesScreen/LocationStyle';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LocationCoord from '../../Fixtures/Geofences.json';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {apiKey} from '../../Services/config'; // your google cloud api key

const LocationScreen = () => {
  const placesRef = useRef();
  const [locationStatus, setLocationStatus] = useState('');
  const {height, width} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;

  const [regionCoords, setRegion] = useState({
    lat: 37.4220936,
    lng: -122.083922,
  });
  const [markerCoords, setMarkerCoords] = useState({
    lat: 37.4220936,
    lng: -122.083922,
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getCurrentPosition();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getCurrentPosition();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    getCurrentPosition();
  }, []);

  const getCurrentPosition = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');

        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);
        const formattedAddress = {
          lng: longitude,
          lat: latitude,
        };

        setRegion(formattedAddress);
        setMarkerCoords(formattedAddress);
        console.log('SARA :', regionCoords.lat, regionCoords.lng);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const onPress = (data, details) => {
    setRegion(details.geometry.location);
    setMarkerCoords(details.geometry.location);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: regionCoords.lat,
          longitude: regionCoords.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{latitude: markerCoords.lat, longitude: markerCoords.lng}}
        />
      </MapView>

      <View style={styles.searchPlace}>
        <GooglePlacesAutocomplete
          ref={placesRef}
          placeholder={'Enter Location Here'}
          onPress={onPress}
          query={{
            key: apiKey,
            components: 'country:my',
            language: 'en',
          }}
          GooglePlacesDetailsQuery={{
            fields: 'geometry',
          }}
          fetchDetails={true}
          onFail={error => console.log(error)}
          onNotFound={() => console.log('no results')}
          listEmptyComponent={() => (
            <View style={{flex: 1}}>
              <Text>No results were found</Text>
            </View>
          )}
          renderRightButton={() =>
            placesRef.current?.getAddressText() ? (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  placesRef.current?.setAddressText('');
                }}>
                <Text>CLEAR</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationScreen;
