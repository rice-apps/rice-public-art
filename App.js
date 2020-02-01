import React from 'react';
import { createAppContainer } from 'react-navigation';
import { StyleSheet, Text, View, Image, Button, StatusBar } from 'react-native';
//added bottom tab navigator
import { createBottomTabNavigator } from 'react-navigation-tabs';
import * as Font from 'expo-font';


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
            style={{ width: 35, height: 35, tintColor: focused ? 'rgb(90, 165, 245)': 'grey'}}
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
            style={{ width: 35, height: 35, tintColor: focused ? 'rgb(90, 165, 245)': 'grey'}}
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
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="calendar-check"
          color={tintColor}
          size={35}
        />
      )
    }
  },
},
  {tabBarOptions: {
    showLabel: true,
    activeTintColor: 'rgb(90, 165, 245)',
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
  };

  async componentDidMount(){
    // Load custom fonts
    await Font.loadAsync({
      'aktiv-grotesk-regular': require('./assets/fonts/AktivGrotesk-Regular.ttf'),
      'aktiv-grotesk-bold': require('./assets/fonts/AktivGrotesk-Bold.ttf'),
    });
    this.setState({ assetsLoaded: true });
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    const {assetsLoaded} = this.state;
    if( assetsLoaded ) {
      return (
          <AppContainer
              ref={nav => {
                  this.navigator = nav;
              }}
          />
      );
    }
    else {
        return (
            <View >
               
            </View>
        );
    }
    }
}
// export default createAppContainer(App);