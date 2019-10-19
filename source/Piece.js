import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Piece extends React.Component {
    render () {
      return (
        <View style={styles.piece_container}>
          <Text style={styles.title}> {this.props.title} </Text>
          <Image style={{width: 250, height: 150}} source={this.props.image} />
          <Text style={styles.description}> {this.props.desc} </Text>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    title: {
      fontWeight:'bold',
      fontSize:25
    },
    description: {
        fontWeight:'normal',
        fontSize:15
      },
  });