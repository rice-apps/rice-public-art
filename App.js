//
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
//added bottom tab navigator
import { createBottomTabNavigator } from 'react-navigation-tabs';
////import { createStackNavigator } from 'react-navigation-stack';

//Screens
import HomeScreen from './screens/Home'
import MapScreen from './screens/Map'
import DetailsScreen from './screens/Details.js'
import AnnounceScreen from './screens/Announce.js'

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
    screen: MapScreen,
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
  },
  //Hidden boy
  Details: {
    screen:DetailsScreen
  }

}, {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgb(90, 165, 245)',
    inactiveTintColor: 'white',
    activeBackgroundColor: 'rgba(0, 0, 0, 0.8)',
    inactiveBackgroundColor: 'rgba(0, 0, 0, 0.7)',
  }
});

export default createAppContainer(TabNavigator);