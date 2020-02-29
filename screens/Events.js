import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native';
import EventCard from '../components/EventCard.js';
import Topbar from '../components/Topbar.js';
import { COLORS, LIGHT_GREEN } from '../COLORS.js';

import { createStackNavigator } from 'react-navigation-stack'
import EventDetailsScreen from './EventDetails.js';

import TextCarousel from "../components/Carousel"

let currentDate = new Date()
let currentMonth = currentDate.getMonth() + 1
let currentYear = currentDate.getFullYear()

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
      loading: true,
      data: []
    };
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
    // Check if data is loaded
    if (this.state.loading) {
      // Display something to inform user data is loading
      return (
      <View>
        <TextCarousel requestData={this.requestData.bind(this)}/>
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
              <TextCarousel requestData={this.requestData.bind(this)}/>
              <ScrollView style={styles.scrollView}>
                {eventComponenents}
              </ScrollView>
            </View>
          );
        } else {
          return (
            <View>
              <TextCarousel requestData={this.requestData.bind(this)}/>
              <ScrollView style={styles.scrollView}>
                <Text> No events :( </Text>
              </ScrollView>
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