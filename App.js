import React from 'react';
import { createAppContainer } from 'react-navigation';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
//added bottom tab navigator
import { createBottomTabNavigator } from 'react-navigation-tabs';

//Screens
import EventsNavigator from './screens/Events'
import MapNavigator from './screens/Map'
import ArtNavigator from './screens/Art'

import Icon from 'react-native-vector-icons/FontAwesome5';

const TabNavigator = createBottomTabNavigator({
  Art: {
    screen: ArtNavigator,
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
  Events: {
    screen: EventsNavigator,
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