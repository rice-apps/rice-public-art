import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class Card extends React.Component {
    render() {
        return (
          <View style={styles.container}>
            <Text> {this.props.name} </Text>
            <Text> {this.props.description} </Text>
            <Image style={{width: 250, height: 250}} source={{uri: "https:"+this.props.image}}/>
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
