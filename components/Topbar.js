import React from 'react';
import { Text, StyleSheet, View, Image} from 'react-native';
import * as Font from 'expo-font';


export default class Topbar extends React.Component {

  render() {
      var leftDisplacement = 0;
      if (this.props.isCenter == undefined || this.props.isCenter == false){
        leftDisplacement = 15;
      }
      return (
        <View style={{
          left: leftDisplacement, 
 
          flexDirection: 'row'}}>
          {icon}
          <Text style={{left:leftDisplacement, fontFamily: 'aktiv-grotesk-bold', fontSize: 30}} > {this.props.text} </Text>
         
        </View>
      );
    }
  }