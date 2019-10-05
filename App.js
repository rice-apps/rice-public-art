import React from 'react';
import Piece from './Piece.js';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
        <Piece title={"Berlin Wall"} desc={"This is a wall"} image={require("./images/wall.png")}> </Piece>
        <Piece title={"Skyspace"} desc={"This is art"} image={require("./images/skyspace.jpg")} > </Piece>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
