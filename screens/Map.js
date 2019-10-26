import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Image, Button, Dimensions } from 'react-native';

export default class MapScreen extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <MapView 
            style={styles.mapStyle} 
            initialRegion={{
              latitude: 29.717031,
              longitude: -95.402857,
              latitudeDelta: 0.03,
              longitudeDelta: 0.015,
            }}/>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
