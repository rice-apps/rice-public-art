import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableHighlight, Button } from 'react-native';
import SwipeGesture from '../swipe-gesture'
import {truncate} from '../util/stringlogic.js' 
import * as Calendar from 'expo-calendar'
import * as Permissions from 'expo-permissions';

class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handlePress.bind(this);
  }

  handlePress = async () => {
    //Getting Permissions
    const statusCal = await Permissions.askAsync(Permissions.CALENDAR);
    const statusRem = await Permissions.askAsync(Permissions.REMINDERS);

    if (statusCal.status === 'granted' && statusRem.status === 'granted') {
      //"Default" Calendar determined as first calendar
      const { id } = await getDefaultCalendar()
      const calEvent = await Calendar.createEventAsync(id,
        {
          title: this.props.title,
          startDate: this.props.date,
          endDate: new Date(this.props.date.getTime() + 60*60000),
          timeZone: 'US/Central',
          location: this.props.location,
          availability: this.props.time
        })
        console.log("Event Added to Calendar")
        alert('This event has been added to your calendar.')
    }
    else{
      alert('Cannot add event to calendar without calendar permissions.')
    }
  }

  render () {
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"][this.props.date.getUTCDay()];
  const dayOfMonth = this.props.date.getUTCDate();
  const accent = this.props.color;

  //Fadeout background: light gray if fadeout; transparent if not fadeout
  const backColor = this.props.fadeOut ? "#f0f0f0":"rgba(255, 255, 255, 0)"
  onSwipePerformed = (action) => {
    console.log("card",action)
    if (action == "press"){
      //On press
      this.props.navigation.navigate('Details',this.props, {param: "Test"})
    } else {
      //Otherwise
      this.props.onSwipePerformed(action)
    }
  }
  return (
    <View style={[styles.card, { borderColor: accent }]}
            underlayColor="transparent"
            style = {styles.container}
           >
          <SwipeGesture onSwipePerformed={onSwipePerformed}>
            <View style={[styles.card, { borderColor: accent }, {backgroundColor:backColor}]}>
            <ImageBackground style={styles.image} imageStyle={{ borderRadius: 10 }} source={{ uri: this.props.image }}>
            </ImageBackground>
            <Text style={[styles.title, { color: accent}]}> {truncate(this.props.title,30)} </Text>
            <View style={styles.bottom}>
              {/* Calendar bit */}
              <View style={styles.calendar}>
                <Text style={[styles.secondaryText, { fontSize: 15, textAlign: 'center'}]} > {dayOfWeek} </Text>
                <Text style={styles.calendarText}> {dayOfMonth} </Text>
              </View>
              {/* Extra info bit*/}
              <View style={styles.extraInfo}>
                <Text style={styles.secondaryText}> {this.props.time}  </Text>
                <Text style={styles.secondaryText} > {this.props.location}  </Text>
              </View>
            </View>
            <Button
                  title="Add to Calendar"
                  onPress={this.handlePress}
            />
            </View>
        </SwipeGesture>
    </View>
  );
}
}

async function getDefaultCalendar() {
  const sources = await Calendar.getCalendarsAsync()
  const defaultCalendar = sources[0];
  if (!defaultCalendar) {
    alert('No calendars availabe.')
  }
  return defaultCalendar;
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10
  },
  image: {
    borderRadius: 100,
    height: 200,
    width: "95%",
    margin: 15
  },
  title: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: -10,
    marginLeft: 20,
  },
  secondaryText: {
    fontWeight: '300',
    fontSize: 16,
  },
  calendar: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    width: 50,
  },
  calendarText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: '600'
  },
  extraInfo: {
    flexShrink: 1,
    marginLeft: 10
  },
  bottom: {
    flexDirection: "row",
    margin: 15,
  }
});

export default EventCard;