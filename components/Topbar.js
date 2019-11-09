import React from 'react';
import { Text, StyleSheet, View, Image} from 'react-native';

export default class Card extends React.Component {
    render() {
        return (
          <View style={{flexDirection: 'row'}}>
            <Image style={{width: 25, height: 25}} source = {require("../assets/orange.jpg")} />
            <Text style={{fontWeight: 'bold'}} > {this.props.text} </Text>
          </View>
        );
      }
    }

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});