import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class MapScreen extends React.Component {
    render() {
      return (
        <View style={styles.art_container}>
          <Text> Check out our map! </Text>
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
