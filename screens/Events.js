import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image} from 'react-native';
import EventCard from '../components/EventCard.js';
import Topbar from '../components/Topbar.js';
import { COLORS, LIGHT_GREEN } from '../COLORS.js';
import SwipeGesture from '../swipe-gesture'
import { createStackNavigator } from 'react-navigation-stack'
import EventDetailsScreen from './EventDetails.js';
import DiscreteCarousel from '../components/DiscreteCarousel'
import {currentMonth,currentYear,getMonth,getYear} from '../util/datelogic.js'

class EventsScreen extends React.Component {
  // Set default state (no data, and loading)
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      loading: true,
      data: [],
    };
  }
  //Navigation Handling
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Topbar text = 'Events'></Topbar>,
    headerStyle: {
      backgroundColor: LIGHT_GREEN,
    },
  })
  //Swiping
  onSwipePerformed = (action) => {
    switch(action){
      case 'left':{
        this.increment(1)
        break;
      }
       case 'right':{
        this.increment(-1)
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
    fetch(`https://moody-backend-273918.uc.r.appspot.com/general/events?month=${month}&year=${year}`, { method: 'GET'})
      .then(response => response.json()) // Get json of response
      .then((responseJson) => {
        this.setState({
          loading: false,
          data: responseJson.data
        })
      })
    .catch(error => console.log(error)) //to catch the errors if any
  }
  increment(delta){
    console.log(this.state.index)
    this.setState({index: this.state.index+delta})
  }

  // Fires when componenet is initially set/mounted
  componentDidMount() {
    this.requestData(currentMonth+1,currentYear)
  }

  componentDidUpdate(prevProps, prevState){
    let i = this.state.index
    if (prevState.index  !=  i){
      this.requestData(getMonth(i+1),getYear(i))
    }
  }
  
  render() {
    // Check if data is loaded
    let carousel_component = <DiscreteCarousel index = {this.state.index} increment={this.increment.bind(this)}></DiscreteCarousel>
    if (this.state.loading) {
      // Display something to inform user data is loading
      return (
      <View>
        {carousel_component}
        <View style = {styles.lowerView}>
            <View style={styles.loadView}>
              <ActivityIndicator size="large" color="#000000" />
            </View>
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
              {carousel_component}
              <SwipeGesture gestureStyle={styles.swipesGestureContainer} onSwipePerformed={this.onSwipePerformed}>
                <View style = {styles.lowerView}>
                  <ScrollView contentContainerStyle={{
                      top:10,
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "90%",
                  }}>
                    {eventComponenents}
                  </ScrollView>
                </View>
              </SwipeGesture>
            </View>
          );
        } else {
          return (
            <View>
              <SwipeGesture gestureStyle={styles.swipesGestureContainer} onSwipePerformed={this.onSwipePerformed}>
                  {carousel_component}
                  <View style = {styles.lowerView}>
                    <View style={styles.loadView}>
                          <Image source={require('../assets/nothing.png')} style={{width: 40, height: 40, opacity:.5}}/>
                          <Text>No Scheduled Events</Text>
                    </View>
                  </View>
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
  lowerView:{
    backgroundColor:"#fcfcfc",
    top:20,
    width:"100%",
    height:"100%"
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    top: 10,
    marginLeft: "auto",
    marginRight: "auto",
    height: "100%",
    width: "100%"
  },
  loadView: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 80,
  }
});