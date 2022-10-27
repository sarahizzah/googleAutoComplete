import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LocationScreen from './src/components/Containers/Screens/LocationScreen';
import placeStore from './src/components/Redux/store';

const store = createStore(placeStore);
const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Location" component={LocationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
