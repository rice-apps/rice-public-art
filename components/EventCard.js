import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableHighlight } from 'react-native';

function EventCard(props) {
  dayOfWeek = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"][props.date.getDay()];
  dayOfMonth = props.date.getDate();
  accent = props.color;
  return (
    <View style={[styles.card, { borderColor: accent }]}>
      {/*Image &  Title*/}
      <ImageBackground style={styles.image} imageStyle={{ borderRadius: 10 }} source={{ uri: props.image }}>
      </ImageBackground>
      <Text style={[styles.title, { color: accent }]}> {props.title} </Text>
      <View style={styles.bottom}>
        {/* Calendar bit */}
        <View style={styles.calendar}>
          <Text style={[styles.secondaryText, { fontSize: 15, textAlign: 'center' }]} > {dayOfWeek} </Text>
          <Text style={styles.calendarText}> {dayOfMonth} </Text>
        </View>
        {/* Extra info bit*/}
        <View style={styles.extraInfo}>
          <Text style={styles.secondaryText}> {props.time}  </Text>
          <Text style={styles.secondaryText} > {props.location}  </Text>
        </View>
      </View>
    </View>
  );
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
    marginLeft: 20
  },
  secondaryText: {
    fontWeight: '200',
    fontSize: 18
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