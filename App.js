import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}><Text style={{color: 'gray'}}>F</Text>ind</Text>
      <Text style={styles.text}><Text style={{color: 'gray'}}>A</Text>rt at</Text>
      <Text style={styles.text}><Text style={{color: 'gray'}}>R</Text>ice</Text>
      <Text style={styles.text}><Text style={{color: 'gray'}}>T</Text>oday</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'left',
    color: '#fff',
    fontSize: 50
  }
});
