import React from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, ActivityIndicator} from 'react-native';
import Art from '../source/Art.js';
import Piece from '../source/Piece.js';

export default class HomeScreen extends React.Component {
  // Set default state for Homescreen (no data, and loading)
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data:[]
     };
   }
   // Fires when componenet is initially set/mounted
    componentDidMount(){
      //Make a fetch call
      fetch('http://moody-backend.herokuapp.com/moodyArt/allArt', {method: 'GET'})
        .then(response => response.json()) // Get json of response
        .then((responseJson)=> { 
            // Adjust state to reflect loaded status / store data from response
            this.setState({
              loading: false,
              data: responseJson
           })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }
    render() {
      // Check if data is loaded
      if(this.state.loading){
        // Display something to inform user data is loading
        return( 
          <View style={styles.container}> 
            <Text> Loading... </Text>
          </View>
      )} else {
        // We got the data
          // Here we have to do somoething with this.state.data to reflect in the return statement
        // console.log("loaded data:",this.state.data);
        // Return display formating data into Piece componenets
        return(
          <View style={styles.container}>
            <Text> Done! </Text>
         </View>
        );
      }
    }
  }
  
  // Style
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });