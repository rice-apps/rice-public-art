//
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

//Screens
import HomeScreen from './screens/Home'
import AnnounceScreen from './screens/Announce.js'

////
const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Announce: {screen: AnnounceScreen },
});
const App = createAppContainer(MainNavigator);
export default App;