import React, {useEffect, useRef, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from '../../StylesScreen/LocationStyle';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {apiKey} from '../../Services/config'; // your google cloud api key
import {placeStore} from '../../Redux/store';

export const LocationScreen = () => {
  const placesRef = useRef();
  const {height, width} = Dimensions.get('window');
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [recentSeacrh, setRecentSeacrh] = useState(false);

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
        subscribeLocationLocation();
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
            subscribeLocationLocation();
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
        console.log('ALREADY HEREE ', position);
        const currLatitude = JSON.stringify(position.coords.latitude);
        const currLongitude = JSON.stringify(position.coords.longitude);
        const formattedAddress = {
          lng: currLongitude,
          lat: currLatitude,
        };

        setRegion(formattedAddress);
        setMarkerCoords(formattedAddress);

        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        setLocationStatus('You are Here');
        console.log('YOU ARE HERE', position);

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  const handleSearchPlace = (data, details) => {
    setRegion(details.geometry.location);
    setMarkerCoords(details.geometry.location);
    setPlaceName(data.description);
    setRecentSeacrh(true);

    const tempData = Object.entries(data).map(([key, val]) => ({
      [key]: val,
    }));
    console.log('NEW tempData', tempData);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f6f9fa'}}>
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

      <View style={styles.googleSearchPlace}>
        <GooglePlacesAutocomplete
          ref={placesRef}
          placeholder={'Enter Location Here'}
          onPress={handleSearchPlace}
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
            <View style={{flex: 1, padding: 10}}>
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
      {recentSeacrh ? (
        <View
          style={{
            marginTop: 5,
            paddingTop: 12,
            backgroundColor: '#F8F8F8',
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}>
          <Text style={{paddingBottom: 8}}>RECENT SEARCHES</Text>
          <Text>{placeName}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default LocationScreen;
