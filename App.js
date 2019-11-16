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
  Events: {
    screen: AnnounceScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="calendar-check"
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
  Art: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => {
        return (
          <Image
            style={{ width: 35, height: 35, tintColor: focused ? 'rgb(90, 165, 245)': 'white'}}
            source={require('./images/moodyLogo.png')} 
          />
        )
      }
    }
  }
},
  {tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgb(90, 165, 245)',
    inactiveTintColor: 'white',
    style: {
      backgroundColor: 'rgb(40, 40, 40)',
    }
  }
});

export default createAppContainer(TabNavigator);