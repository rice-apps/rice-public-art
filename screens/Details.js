import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Topbar from '../components/Topbar.js';
import { Dimensions } from 'react-native';
import Image from 'react-native-scalable-image'
import { COLORS, LIGHT_ORANGE } from '../COLORS.js';
import { StackActions, NavigationActions } from 'react-navigation';


//controls from Art and Map
export default class DetailsScreen extends React.Component {
    getParam(param,def){
      return this.props.navigation.getParam(param,def)
    } 
    static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: <Topbar text = "Art" isCenter = {true}/>,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: LIGHT_ORANGE,
        },
      }
    }

    componentDidMount() {
      //Navigates to previous page in stack navigation when you jump back to the page
      //prevents details page from being there when you go back
      const didFocus = this.props.navigation.addListener(
        'willFocus',
        payload => {
          //If you click on the bottom bar from another page
          if (payload.action.type == "Navigation/JUMP_TO") {
            
            const resetAction = StackActions.reset({
              index: 0,
              //Navigates to Home when you click back to Art or Map
              actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            //this runs the action
            this.props.navigation.dispatch(resetAction);
          }
        }
      );
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
            <Text>  </Text> 
            {/* Title */}
            <Text style ={[styles.title, {color: LIGHT_ORANGE}]}> {this.getParam("name","Title")} </Text>
            <View style={styles.bottom}>
              {/* Artist and Year*/}
              <View>
                <Text style={styles.artist}> {this.getParam("artist","Artist")} </Text>
                <Text style={styles.year}> {this.getParam("year","Year Created")} </Text>
              </View>
              <Text> </Text>
              <View>
                <Text style={styles.description}> {this.getParam("description","default desc")} </Text>
              </View>
            </View>
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
  title: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: -10,
    marginLeft: 20,
  },
  bottom: {
    marginLeft: 20,
    marginRight: 20,
    textAlign: "left",
  },
  artist: {
    fontWeight: '300',
    fontSize: 16,
  },
  year: {
    fontWeight: '300',
    fontSize: 16,
  },
  description: {
    fontWeight: '300',
    fontSize: 14,
  },
});