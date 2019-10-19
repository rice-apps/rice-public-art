import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import Art from '../source/Art.js';
import Piece from '../source/Piece.js';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.art_container}>
            <Art>
                <Piece title={"Berlin Wall"} desc={"This is a wall"} image={require("../images/wall.png")}> </Piece>
                <Piece title={"Skyspace"} desc={"This is art"} image={require("../images/skyspace.jpg")} > </Piece>  
            </Art>
            <Button
                title="Go to Announcements!"
                onPress={() => navigate('Announce', {name: 'Jane'})}
            />
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