import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import Art from '../source/Art.js';
import Piece from '../source/Piece.js';

export default class HomeScreen extends React.Component {
    componentDidMount(){
      fetch('http://moody-backend.herokuapp.com/moodyArt/allArt', {method: 'GET'})
        .then( (res) => console.log("data:",res.json() ) );
    }
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.art_container}>
            <Art>
                <Piece title={"Berlin Wall"} desc={"This is a wall"} image={require("../images/wall.png")}> </Piece>
                <Piece title={"Skyspace"} desc={"This is art"} image={require("../images/skyspace.jpg")} > </Piece>  
            </Art>
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