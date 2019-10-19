import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class AnnounceScreen extends React.Component {
    render() {
      return (
        <View style={styles.art_container}>
          <Text> Moody is on fire! </Text>
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
