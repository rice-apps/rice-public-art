//
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
//added bottom tab navigator
import { createBottomTabNavigator } from 'react-navigation-tabs';

//Screens
import HomeScreen from './screens/Home'
import MapScreen from './screens/Map'
import AnnounceScreen from './screens/Announce.js'

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Map: MapScreen,
  Announcements: AnnounceScreen,
});

export default createAppContainer(TabNavigator);