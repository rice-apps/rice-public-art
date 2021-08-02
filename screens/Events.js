import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, Alert} from 'react-native';
import EventCard from '../components/EventCard.js';
import Topbar from '../components/Topbar.js';
import ScrollViewLabel from '../components/ScrollViewLabel.js';
import { COLORS, LIGHT_GREEN } from '../COLORS.js';
import SwipeGesture from '../swipe-gesture'
import { createStackNavigator } from 'react-navigation-stack'
import EventDetailsScreen from './EventDetails.js';
import DiscreteCarousel from '../components/DiscreteCarousel'
import {currentMonth,currentYear,getMonth,getYear} from '../util/datelogic.js'

cutoff = new Date(); //Today

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
    console.log(action);
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

  //Hit backend
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
  
  //Increment request
  increment(delta){
    // Check if swipe is not to far
    if( Math.abs(this.state.index + delta) <= 12) {
      //Chance index
      this.setState({index: this.state.index+delta})
    } else {
      //Alert if gone too far
      Alert.alert("You've gone too far!","Only events a year into the future or past will be displayed.")
    }
  }

  // Fires when componenet is initially set/mounted
  componentDidMount() {
    this.requestData(currentMonth+1,currentYear)
    //Resest on focus
    const didFocus = this.props.navigation.addListener(
      'willFocus',
       payload => {
        let actionType = payload.action.type
        //Check if not "back" refocus
        if (actionType != "Navigation/BACK") {
          this.setState({index: 0})
        }
      }
    );
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
        eventComponenents.push(
          <EventCard
          key={'card' + i}
          title={content.title}
          description={content.description}
          image={content.image}
          time={content.time}
          location={content.location}
          color={COLORS[i % COLORS.length]}
          date={date}
          navigation={this.props.navigation}
          onSwipePerformed={this.onSwipePerformed.bind(this)}
          fadeOut = {date < cutoff}
          >
          </EventCard>)      
      }
      for (let i = 0; i < this.state.data.length; i++) {
        var content = this.state.data[i]
        const date = new Date(content.date + 'T06:00:00');
        eventComponenents.push(
          <EventCard
          key={'card' + i}
          title={content.title}
          description={content.description}
          image={content.image}
          time={content.time}
          location={content.location}
          color={COLORS[i % COLORS.length]}
          date={date}
          navigation={this.props.navigation}
          onSwipePerformed={this.onSwipePerformed.bind(this)}
          fadeOut = {date < cutoff}
          >
          </EventCard>)      
      }
      // Creating two dummy events for testing events
      var date1 = new Date(2021, 6, 17, 11, 0, 0, 0);
      eventComponenents.push(
        <EventCard
        key={'card1'}
        title="Dummy Event 1"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        image={"http://www.html.am/images/samples/remarkables_queenstown_new_zealand-300x225.jpg"}
        time={"11:00"}
        location={"Dummy Location"}
        color={COLORS[1 % COLORS.length]}
        date={date1}
        navigation={this.props.navigation}
        onSwipePerformed={this.onSwipePerformed.bind(this)}
        fadeOut = {date1 < cutoff}
        >
        </EventCard>)  
      var date2 = new Date(2021, 6, 10, 13, 0, 0, 0);
      eventComponenents.push(
        <EventCard
        key={'card2'}
        title="Dummy Event 2"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        image={"http://www.html.am/images/samples/remarkables_queenstown_new_zealand-300x225.jpg"}
        time={"13:00"}
        location={"Dummy Location"}
        color={COLORS[2 % COLORS.length]}
        date={date2}
        navigation={this.props.navigation}
        onSwipePerformed={this.onSwipePerformed.bind(this)}
        fadeOut = {date2 < cutoff}
        >
        </EventCard>)  
      //Sort event cards
      eventComponenents.sort((card_a,card_b)=>{
        //Get date of each card
        var date_a = card_a.props.date
        var date_b = card_b.props.date
        if ((date_a > cutoff) == (date_b > cutoff)){
          //Both in future or both in past
          if (date_a < date_b){
            return -1
          } else {
            return 1
          }
        } else if (date_a > cutoff){
          //Event A is in future
          return -1
        } else {
          //Event B is in future
          return 1
        }
      })
      if (eventComponenents.length > 0){
        //Find cut off position in list
        var lastFutureEvent = -1;
        eventComponenents.forEach(function (card, index) {
          var date = card.props.date
          if (date > cutoff) {
            lastFutureEvent = index
          }
        });
        //Add Past Events Label
        if (lastFutureEvent < eventComponenents.length){
          eventComponenents.splice(lastFutureEvent+1,0, <ScrollViewLabel key={'label'}
          >Past Events</ScrollViewLabel>)
        }

        return (
          <View>
            {carousel_component}
            <SwipeGesture onSwipePerformed={this.onSwipePerformed}>
              <View style = {styles.lowerView}>
                <ScrollView contentContainerStyle={{
                    top:10,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "90%",
                }}>
                  <View>
                   {eventComponenents}
                  </View>
                  <View style = {{height:150}}>
                  </View>
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
                        <Text style={{fontFamily:"aktiv-grotesk-bold"}}>No Scheduled Events</Text>
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