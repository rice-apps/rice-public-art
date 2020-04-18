import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableHighlight } from 'react-native';
import SwipeGesture from '../swipe-gesture'

class EventCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
  dayOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"][this.props.date.getUTCDay()];
  dayOfMonth = this.props.date.getUTCDate();
  accent = this.props.color;
  //Fadeout background: light gray if fadeout; transparent if not fadeout
  backColor = this.props.fadeOut ? "#f0f0f0":"rgba(255, 255, 255, 0)"
  return (
    <SwipeGesture onSwipePerformed={this.props.onSwipePerformed}>
    <TouchableHighlight style={[styles.card, { borderColor: accent }]}
            underlayColor="transparent"
            style = {styles.container}
            onPress={() => 
              this.props.navigation.navigate('Details',this.props)
            }>
            <View style={[styles.card, { borderColor: accent }, {backgroundColor:backColor}]}>
            <ImageBackground style={styles.image} imageStyle={{ borderRadius: 10 }} source={{ uri: this.props.image }}>
            </ImageBackground>
            <Text style={[styles.title, { color: accent }]}> {this.props.title} </Text>
            <View style={styles.bottom}>
              {/* Calendar bit */}
              <View style={styles.calendar}>
                <Text style={[styles.secondaryText, { fontSize: 15, textAlign: 'center' }]} > {dayOfWeek} </Text>
                <Text style={styles.calendarText}> {dayOfMonth} </Text>
              </View>
              {/* Extra info bit*/}
              <View style={styles.extraInfo}>
                <Text style={styles.secondaryText}> {this.props.time}  </Text>
                <Text style={styles.secondaryText} > {this.props.location}  </Text>
              </View>
            </View>
            </View>
    </TouchableHighlight>
    </SwipeGesture>
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
    fontFamily:"aktiv-grotesk-bold"
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