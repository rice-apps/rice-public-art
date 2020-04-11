import React, {useEffect, Fragment} from 'react';
import { createAppContainer } from 'react-navigation';
import { StyleSheet, Text, View, Image, Button, StatusBar, Platform } from 'react-native';
//added bottom tab navigator
import { createBottomTabNavigator } from 'react-navigation-tabs';
import * as Font from 'expo-font';
import { LIGHT_ORANGE, BLUE, LIGHT_GREEN } from './COLORS.js'
import { SplashScreen } from 'expo';
import {Asset} from 'expo-asset';


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
            style={{ width: 35, height: 35, tintColor: focused ? LIGHT_ORANGE: 'grey'}}
            source={require('./images/moodyOutlineLogo.png')} 
            color = {tintColor}
          />
        )
      }
    }
  },
  Map: {
    screen: MapNavigator,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => {
        return (
          <Image
            style={{ width: 35, height: 35, tintColor: focused ? BLUE : 'grey'}}
            source={require('./images/mapIconOutline.png')} 
            color = {tintColor}
          />
        )
      }
    }
  },
  Events: {
    screen: EventsNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon
          name="calendar-check"
          color={focused ? LIGHT_GREEN : 'grey'}
          size={35}
        />
      )
    }
  },
},
  {tabBarOptions: {
    showLabel: true,
    activeTintColor: 'grey',
    inactiveTintColor: 'grey',
    style: {
      backgroundColor: 'white',
      height: 70,
    },
  }
});


const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {

  state = {
    assetsLoaded: false,
    //new
    isReady: false,
  };

  componentDidMount(){
    SplashScreen.preventAutoHide();
  }

  async componentDidMount(){
    //new
    //SplashScreen.preventAutoHide();
    // Load custom fonts
    await Font.loadAsync({
      'aktiv-grotesk-regular': require('./assets/fonts/AktivGrotesk-Regular.ttf'),
      'aktiv-grotesk-bold': require('./assets/fonts/AktivGrotesk-Bold.ttf'),
    });
    this.setState({ assetsLoaded: true });
  }

  render() {
    if (!this.state.isReady) {
      return (
        console.log("hello"),
        <View style={{ flex: 1 }}>
          <Image
            source={require('./assets/splash.gif')}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }
    StatusBar.setBarStyle('light-content', true);
    const {assetsLoaded} = this.state;
    if( assetsLoaded ) {
      return (
        console.log("hi"),
          <AppContainer
              ref={nav => {
                  this.navigator = nav;
              }}
          />
      );
    }
  }
}
_cacheSplashResourcesAsync = async () => {
  const gif = require('./assets/splash.gif');
  return Asset.fromModule(gif).downloadAsync();
};

_cacheResourcesAsync = async () => {
  SplashScreen.hide();
  this.setState({ isReady: true });
};
//export default createAppContainer(App);