import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Image, Button, Dimensions } from 'react-native';

export default class MapScreen extends React.Component {
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
          fetch('http://moody-backend.herokuapp.com/campusArt/allArt', {method: 'GET'})
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
