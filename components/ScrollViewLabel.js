import React from 'react';
import { View, Text,} from 'react-native';
import { BLUE } from '../COLORS';
export default class ScrollViewLabel extends React.Component {
    render() {
        return (
        <View>
          <View style={{height:15}}></View> 
          <View style={{height:1, backgroundColor:"#808080"}}></View>
          <View style={{height:5}}></View>
          <Text style={{fontWeight:"bold", fontSize: 36, color:BLUE}}>{this.props.children}</Text>
          <View style={{height:10}}></View>
        </View>
        );
      }
    }

