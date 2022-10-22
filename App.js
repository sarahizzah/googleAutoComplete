import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import friendsReducer from './src/components/main';
import HomeScreen from './src/components/HomeScreen';
import Trending from './src/components/Trending';

const store = createStore(friendsReducer);
const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Location" component={HomeScreen} />
            <Stack.Screen name="Trending" component={Trending} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
