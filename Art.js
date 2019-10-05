import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Art extends React.Component {
    render () {
      return (
        <View style={styles.art_container}>
            {this.props.children}
        </View>
      )
    }
  }
  const styles = StyleSheet.create({
    art_container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });