import React from 'react';
import { Text, StyleSheet, View, Image} from 'react-native';

export default class Topbar extends React.Component {

  render() {
      var leftDisplacement = 0;
      if (this.props.isCenter == undefined || this.props.isCenter == false){
        leftDisplacement = 15;
      }
      return (
        <View style={{
          left: leftDisplacement, 
          flexDirection: 'row'
        }}>
          <Text style={{left:leftDisplacement, fontWeight: 'bold', fontSize: 30, color: 'white'}} > {this.props.text} </Text>
        </View>
      );
    }
  }