import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import EventCard from '../components/EventCard.js';
import Topbar from '../components/Topbar.js';
import { COLORS, LIGHT_GREEN } from '../COLORS.js';

import { createStackNavigator } from 'react-navigation-stack'
import EventDetailsScreen from './EventDetails.js';

import TextCarousel from "../components/Carousel"

class EventsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Topbar text="Events"></Topbar>,
    headerStyle: {
      backgroundColor: LIGHT_GREEN,
    },
  })
  // Set default state (no data, and loading)
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [
      ],
      month: 0
    };
  }

  setMonth(newMonth) {
    console.log(newMonth);
    //this.setState({month: newMonth});
  }

  // Fires when componenet is initially set/mounted
  componentDidMount() {
    fetch('http://moody-backend.herokuapp.com/general/events', { method: 'GET' })
      .then(response => response.json()) // Get json of response
      .then((responseJson) => {
        this.setState({
          loading: false,
          data: responseJson.data
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any
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
      // We got the data! 
      // Here we have to do somoething with this.state.data to reflect in the return statement
      // Return display formating data into Piece componenets
      let eventComponenents = []
      //let component
      for (let i = 0; i < this.state.data.length; i++) {
        var content = this.state.data[i]
        const date = new Date(content.date + 'T06:00:00');
        console.log(date.toString())
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
      return (
        <View>
          <TextCarousel setMonth={this.setMonth.bind(this)}/>
          <ScrollView style={styles.scrollView}>
            {eventComponenents}
          </ScrollView>
        </View>
      );
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
});