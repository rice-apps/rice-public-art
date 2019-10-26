//
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
//added bottom tab navigator
import { createBottomTabNavigator } from 'react-navigation-tabs';

//Screens
import HomeScreen from './screens/Home'
import MapScreen from './screens/Map'
import AnnounceScreen from './screens/Announce.js'

import Icon from 'react-native-vector-icons/FontAwesome5';

// const TabNavigator = createBottomTabNavigator({
//   Home: HomeScreen,
//   Map: MapScreen,
//   Announcements: AnnounceScreen,
// });

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="home"
          color={tintColor}
          size={24}
        />
      )
    }
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="map-marked-alt"
          color={tintColor}
          size={24}
        />
      )
    }
  },
  Announcements: {
    screen: AnnounceScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="bullhorn"
          color={tintColor}
          size={24}
        />
      )
    }
  }
}, {
  // tabBarOptions: {
    // showLabel: false,
    // activeTintColor: '#000000',
    // inactiveTintColor: '#555555'
  // }
});

export default createAppContainer(TabNavigator);