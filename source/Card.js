import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class Card extends React.Component {
    render() {
        return (
          <View style={styles.container}>
            <Text> {this.props.name} </Text>
            <Text> {this.props.description} </Text>
            <Text> {this.props.image} </Text>
            <Text> {this.props.location} </Text>
          </View>
        );
      }
    }
  
  const styles = StyleSheet.create({
      art_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
  });
