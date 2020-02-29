import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native';
import EventCard from '../components/EventCard.js';
import Topbar from '../components/Topbar.js';
import { COLORS, LIGHT_GREEN } from '../COLORS.js';
import SwipeGesture from '../swipe-gesture'

import { createStackNavigator } from 'react-navigation-stack'
import EventDetailsScreen from './EventDetails.js';

import TextCarousel from "../components/Carousel"

let currentDate = new Date()
let currentMonth = currentDate.getMonth() + 1
let currentYear = currentDate.getFullYear()

class EventsScreen extends React.Component {
  // Set default state (no data, and loading)
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
    this.carousel = null;
  }
  //Navigation Handling
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Topbar text="Events"></Topbar>,
    headerStyle: {
      backgroundColor: LIGHT_GREEN,
    },
  })
  //Swiping
  onSwipePerformed = (action) => {
    /// action : 'left' for left swipe
    /// action : 'right' for right swipe
    /// action : 'up' for up swipe
    /// action : 'down' for down swipe
    switch(action){
      case 'left':{
        if (this.carousel){
          this.carousel._carousel.snapToNext();
        }
        break;
      }
       case 'right':{
        if (this.carousel){
          this.carousel._carousel.snapToPrev();
        }
        break;
      }
    }
  }

  requestData(month,year){
    console.log("Requesting:",month,year);
    this.setState({
      loading:true,
      data: []
    })
    fetch(`http://moody-backend.herokuapp.com/general/events?month=${month}&year=${year}`, { method: 'GET'})
      .then(response => response.json()) // Get json of response
      .then((responseJson) => {
        this.setState({
          loading: false,
          data: responseJson.data
        })
      })
    .catch(error => console.log(error)) //to catch the errors if any
  }

  // Fires when componenet is initially set/mounted
  componentDidMount() {
    this.requestData(currentMonth,currentYear)
  }

  render() {
    carousel_component = <TextCarousel ref ={(c)=> {this.carousel=c}} requestData={this.requestData.bind(this)}/>
    // Check if data is loaded
    if (this.state.loading) {
      // Display something to inform user data is loading
      return (
      <View>
        <View style={styles.loadView}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      </View>
      )
    } else {
      // We got the data! 
      let eventComponenents = []
      //let component
      for (let i = 0; i < this.state.data.length; i++) {
        var content = this.state.data[i]
        const date = new Date(content.date + 'T06:00:00');
        eventComponenents.push(<EventCard
          key={'card' + i}
          title={content.title}
          description={content.description}
          image={content.image}
          time={content.time}
          location={content.location}
          color={COLORS[i % COLORS.length]}
          date={date}
          navigation={this.props.navigation}>
        </EventCard>)
      }
        if (eventComponenents.length > 0){
          return (
            <View>
              <SwipeGesture gestureStyle={styles.swipesGestureContainer} onSwipePerformed={this.onSwipePerformed}>
              {carousel_component}
                <ScrollView style={styles.scrollView}>
                  {eventComponenents}
                </ScrollView>
              </SwipeGesture>
            </View>
          );
        } else {
          return (
            <View>
              <SwipeGesture gestureStyle={styles.swipesGestureContainer} onSwipePerformed={this.onSwipePerformed}>
                  {carousel_component}
                  <ScrollView style={styles.loadView}>
                      <Text> No events for this month </Text>
                  </ScrollView>
              </SwipeGesture>
            </View>
          );
        }
      }
    }
}

export default createStackNavigator({
  List: {
    screen: EventsScreen,
  },
  Details: {
    screen: EventDetailsScreen,
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
    height: "100%",
    width: "100%"
  },
  loadView: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center'
  }
});