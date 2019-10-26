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

// const TabNavigator = createBottomTabNavigator({
//   Home: HomeScreen,
//   Map: MapScreen,
//   Announcements: AnnounceScreen,
// });

const TabNavigator = createBottomTabNavigator ({
  Home:{
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: (focused, tintColor) => (
        <Image 
          style={{ width: 35, height: 35 }}
          source={require('./images/mapIcon.png')} 
          tintColor={tintColor}/>
      )
    }
  },
  Map:{
    screen: MapScreen,
    navigationOptions:{
      tabBarIcon: (focused, tintColor) => (
        <Image 
          style={{ width: 35, height: 35 }}
          source={require('./images/mapIcon.png')} 
          tintColor={tintColor}/>
      )
    }
  },
  Announcements:{
    screen: AnnounceScreen,
    navigationOptions:{
      tabBarIcon: (focused, tintColor) => (
        <Image 
          style={{ width: 35, height: 35 }}
          source={require('./images/mapIcon.png')} 
          tintColor={tintColor}/>
      )
    }
  }
}, {
  tabBarOptions: { 
    showLabel: false,
    activeTintColor: '#000000',
    inactiveTintColor: '#555555'
  }
});

export default createAppContainer(TabNavigator);