//
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
//added bottom tab navigator
import { createBottomTabNavigator } from 'react-navigation-tabs';

//Screens
import HomeScreen from './screens/Home'
import MapNavigator from './screens/Map'
import AnnounceScreen from './screens/Announce'

import Icon from 'react-native-vector-icons/FontAwesome5';

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="home"
          color={tintColor}
          size={30}
        />
      )
    }
  },
  Map: {
    screen: MapNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="map-marked-alt"
          color={tintColor}
          size={30}
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
          size={30}
        />
      )
    }
  }
}, {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgb(90, 165, 245)',
    inactiveTintColor: 'white',
    // activeBackgroundColor: 'rgba(0, 0, 0, 0.8)',
    // inactiveBackgroundColor: 'rgba(0, 0, 0, 0.7)',
    style: {
      backgroundColor: 'rgb(40, 40, 40)',
    }
  }
});

export default createAppContainer(TabNavigator);