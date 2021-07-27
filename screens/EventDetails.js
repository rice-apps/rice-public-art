import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import Topbar from '../components/Topbar.js';
import { Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';
import { COLORS, LIGHT_GREEN } from '../COLORS.js';

export default class EventDetailsScreen extends React.Component {
    accent = this.props.color;
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
            <Text style={[styles.title, { color: accent }]}>{this.getParam('title')}</Text>
            <View style={styles.bottom}>
              {/* Calendar bit */}
              <View style={styles.calendar}>
                <Text style={[styles.secondaryText, { fontSize: 15, textAlign: 'center' }]} >{dayOfWeek}</Text>
                <Text style={styles.calendarText}>{dayOfMonth}</Text>
              </View>
              {/* Extra info bit*/}
              <View style={styles.extraInfo}>
                <Text style={styles.secondaryText}>{this.getParam('time')}</Text>
                <Text style={styles.secondaryText}>{this.getParam('location')}</Text>
              </View>
            </View>
            <View style = {styles.innerView}>
              <Text style = {styles.description}>{this.getParam("description","default desc")}</Text>
            </View>
            <Button
              onPress={() => Alert.alert('Simple Button pressed')}
              title="Add to Calendar"
              color="#841584"
            />
        </ScrollView>  
      );
    }
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
});