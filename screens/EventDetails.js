import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Topbar from '../components/Topbar.js';
import { Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';
import { COLORS, LIGHT_GREEN } from '../COLORS.js';
import { Button } from 'react-native-elements';
import * as Calendar from 'expo-calendar'
import * as Permissions from 'expo-permissions';

export default class EventDetailsScreen extends React.Component {
    
    getParam(param,def){
      return this.props.navigation.getParam(param,def)
    } 
    static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: <Topbar text = "Event" isCenter = {true}/>,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: LIGHT_GREEN,
        },
      }
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
            title: this.getParam("title"),
            startDate: this.getParam("date"),
            endDate: new Date(this.getParam("date").getTime() + 60*60000),
            timeZone: 'US/Central',
            location: this.getParam("location"),
            availability: this.getParam("time")
          })
          console.log("Event Added to Calendar")
          alert('This event has been added to your calendar.')
      }
      else{
        alert('Cannot add event to calendar without calendar permissions.')
      }
    }

    render() {
      
      return (
        <ScrollView style={styles.scrollView}>
            <Image  
              width={Dimensions.get('window').width}
              source={{uri: this.getParam("image","default image")}}
            />
            {/* Spacer */}
            <Text>  </Text> 
            {/* Title */}
            <Text style={[styles.title, { color: this.getParam("color") }]}>{this.getParam('title')}</Text>
            <View style={styles.bottom}>
              {/* Calendar bit */}
              <View style={styles.calendar}>
                <Text style={[styles.secondaryText, { fontSize: 15, textAlign: 'center' }]} >{["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"][this.getParam('date').getUTCDay()]}</Text>
                <Text style={styles.calendarText}>{this.getParam('date').getUTCDate()}</Text>
              </View>
              {/* Extra info bit*/}
              <View style={styles.extraInfo}>
                <Text style={styles.secondaryText}>{this.getParam('time')}</Text>
                <Text style={styles.secondaryText}>{this.getParam('location')}</Text>
              </View>
              <View style={styles.button}>
                <Button
                    title="Add to Calendar"
                    onPress={this.handlePress}
                    buttonStyle={{
                      padding: 10,
                    }}
                />
              </View>
            </View>
            <View style = {styles.innerView}>
              <Text style = {styles.description}>{this.getParam("description","default desc")}</Text>
            </View>
            <View style={styles.button}>
              <Button
                  title="Add to Calendar"
                  onPress={this.handlePress}
                  buttonStyle={{
                    padding: 10,
                    marginTop: 20,
                    width: 170
                  }}
              />
            </View>
        </ScrollView>  
      );
    }
  }

async function getDefaultCalendar() {
  const sources = await Calendar.getCalendarsAsync();
  const defaultCalendar = sources[0];
  if (!defaultCalendar) {
    alert('No calendars availabe.')
    return;
  }
  return defaultCalendar;
}

const styles = StyleSheet.create({
  scrollView: {
    marginLeft:"auto", 
    marginRight:"auto",
    width:"100%"
  },
  innerView: {
    marginLeft:"auto", 
    marginRight:"auto",
    width:"95%"
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
    margin: 10,
  },
  description: {
    fontWeight: '300',
    fontSize: 14,
  },
  title: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: -10,
    marginLeft: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});