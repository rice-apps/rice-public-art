import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, Button, Alert, TouchableHighlight } from 'react-native';
import SwipeGesture from '../swipe-gesture'
import {truncate} from '../util/stringlogic.js'
import * as Calendar from 'expo-calendar'; 

class EventCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const details = {
      title: this.props.title,
      startDate: this.props.date.getUTCDate(),
      endDate: this.props.date.getUTCDate(),
      location: this.props.location
    }

  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"][this.props.date.getUTCDay()];
  const dayOfMonth = this.props.date.getUTCDate();
  const accent = this.props.color;
  //Fadeout background: light gray if fadeout; transparent if not fadeout
  const backColor = this.props.fadeOut ? "#f0f0f0":"rgba(255, 255, 255, 0)"
  const onSwipePerformed = (action) => {
    console.log("card",action)
    if (action == "press"){
      //On press
      this.props.navigation.navigate('Details',this.props, {param: "Test"})
    } else {
      //Otherwise
      this.props.onSwipePerformed(action)
    }
  }

  function addToCalendar() {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      console.log(status)
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log(calendars);
        const defaultCalendar = calendars[0];
        console.log('default', defaultCalendar);
        const calendarId = defaultCalendar.id;
        console.log('id', calendarId);
        console.log(Calendar.createEventAsync(calendarId, details));
      }
    })();
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
              onPress={() => addToCalendar()}
              title="Add to Calendar"
              color="#841584"
            />
            </View>
        </SwipeGesture>
    </View>
  );
}
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
    marginLeft: 10
  },
  bottom: {
    flexDirection: "row",
    margin: 15,
  }
});

export default EventCard;