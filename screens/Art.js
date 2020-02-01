import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Card from '../components/Card.js';
import Topbar from '../components/Topbar.js';
import { LIGHT_ORANGE } from '../COLORS.js'

import * as Font from 'expo-font';

import { createStackNavigator } from 'react-navigation-stack'
import DetailsScreen from './Details.js';
import distance from '../util/distance.js'
import { withOrientation } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Topbar text="Art"/>,
    headerStyle: {
      backgroundColor: LIGHT_ORANGE,
    },
  })
  // Set default state for Homescreen (no data, and loading)
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      userLocation: null

    };
  }
  // Fires when componenet is initially set/mounted
  componentDidMount() {
    //Make a fetch call
    fetch('http://moody-backend.herokuapp.com/campusArt/allArt', { method: 'GET' })
      .then(response => response.json()) // Get json of response
      .then((responseJson) => {
        // Adjust state to reflect loaded status / store data from response

        this.setState({
          loading: false,
          data: responseJson.data
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any

    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      this.setState({
        userLocation: {
          latitude: lat,
          longitude: long
        }
      })
    },
      (error) => console.log(JSON.stringify(error)),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
  }
  render() {
    // Check if data is loaded
    if (this.state.loading) {
      // Display something to inform user data is loading
      return (
        <View>
          <Text> Loading... </Text>
        </View>
      )
    } else {
      // We got the data
      // Here we have to do somoething with this.state.data to reflect in the return statement
      // Return display formating data into Piece componenets
      return (
        <ScrollView style={styles.scrollView}>
          {this.state.data.map((content, i) =>
            <Card
              key={'card' + i}
              name={content.name}
              description={content.description}
              image={content.image}
              location={content.location}
              // Assume a 20 min. per mile walking speed
              // This is on the high end because we are using a straight line approximation for the route
              // which underestimates the total distance
              distance={this.state.userLocation != null ?
                Math.round(distance(this.state.userLocation.latitude, this.state.userLocation.longitude,
                  content.location.lat, content.location.lon) * 20) + " min. 🕒"
                : null}
              navigation={this.props.navigation}
            />
          )}
        </ScrollView>
      );
    }
  }
}

export default createStackNavigator({
  List: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  }
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%"
  },

});