import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = () => {
  const mapRef = useRef(null);
  const pickupInputRef = useRef(null);

  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [locationStatus, setLocationStatus] = useState('');
  const {height, width} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const [activeItem, setActiveItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeInput, setActiveInput] = useState('dropoff');
  const [_pickupLocation, _setPickupLocation] = useState(
    pickupLocation || null,
  );

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
        console.log('SARA :', position);
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;

        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
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

  const handleBackspace = ({nativeEvent}) => {
    if (nativeEvent.key === 'Backspace') {
      if (activeInput === 'pickup') {
        _setPickupLocation(null);
      } else {
        _setDropoffLocation(null);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.4220936,
          longitude: -122.083922,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: 37.4220936,
            longitude: -122.083922,
          }}></Marker>
      </MapView>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          backgroundColor: 'white',
          marginTop: 10,
          zIndex: 1,
          position: 'absolute',
        }}>
        <TextInput
          ref={pickupInputRef}
          placeholder={'Enter Location Here'}
          onFocus={() => setActiveInput('pickup')}
          underlineColorAndroid="transparent"
          selectTextOnFocus={true}
          numberOfLines={1}
          onChangeText={text => {
            if (_pickupLocation) {
              _setPickupLocation(null);
            }
            setSearchTerm(text);
          }}
          autoCompleteType={'off'}
          value={
            _pickupLocation
              ? _pickupLocation.name
              : activeInput === 'pickup'
              ? searchTerm
              : ''
          }
          onKeyPress={handleBackspace}
          autoCorrect={false}
          autoFocus={activeInput === 'pickup'}
          style={{
            fontWeight: '700',
            color: 'black',
            fontSize: 15,
            flex: 1,
            paddingRight: 30,
            height: 24,
            padding: 0,
          }}
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default HomeScreen;
