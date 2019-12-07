import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Topbar from '../components/Topbar.js';
import { Dimensions } from 'react-native';
import Image from 'react-native-scalable-image'

export default class EventDetailsScreen extends React.Component {
    getParam(param,def){
      return this.props.navigation.getParam(param,def)
    } 
    static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: <Topbar text = "Art" isCenter = {true}/>,
        headerTintColor: 'rgb(216,93,45)'
      }
    }
    render() {
      return (
        <ScrollView style={styles.scrollView}>
            <Image  
              width={Dimensions.get('window').width}
              source={{uri: this.getParam("image","default image")}}
            />
            <Text style ={{fontWeight: 'bold', fontSize: 25}}> {this.getParam("name","Title")} </Text>
            <Text> {this.getParam("description","default desc")} </Text>
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
});
