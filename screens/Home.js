import React from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, ActivityIndicator} from 'react-native';
import Art from '../source/Art.js';
import Piece from '../source/Piece.js';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource:[]
     };
   }
    componentDidMount(){
      fetch('http://moody-backend.herokuapp.com/moodyArt/allArt', {method: 'GET'})
        .then(response => response.json())
        .then((responseJson)=> {
            this.setState({
            loading: false,
            data: responseJson
           })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }
    render() {
      console.log(this.state.loading);
      if(this.state.loading){
        return( 
          <View style={styles.loader}> 
            <Text> Loading... </Text>
          </View>
      )} else {
        console.log("loaded data:",this.state.data);
        return(
          <View style={styles.container}>
            <Text> Done! </Text>
         </View>
        );
      }
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });