import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
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
    setMarker(details.geometry.location);
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

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          marginTop: 10,
          zIndex: 1,
          position: 'absolute',
        }}>
        <GooglePlacesAutocomplete
          ref={placesRef}
          placeholder={'Enter Location Here'}
          // onPress={(data, details = null) => {
          //   // 'details' is provided when fetchDetails = true
          //   console.log(data, details);
          // }}
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
          currentLocation={true}
          currentLocationLabel="Your location!"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
  SectionStyle: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,
    borderRadius: 5,
  },
});

export default LocationScreen;
