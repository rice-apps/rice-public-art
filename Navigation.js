import React, { Component } from 'react';
import { Text, View } from 'react-native';
import NavigationBar from 'react-native-navigation-bar';

export default class Example extends React.Component {
  render() {
    return (
      <View>
        <NavigationBar 
          title='Main title'
          height={50}
          leftButtonTitle='back'
          rightButtonTitle='forward'
        ></NavigationBar>
        <Text>ABC</Text>
      </View>
    );
  }
}