import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';


export default class AnnounceScreen extends React.Component {
    getParam(param,def){
        return this.props.navigation.getParam(param,def)
    }
    render() {
      return (
        <View style={styles.art_container}>
          <Text> Details </Text>
            <Text> {this.getParam("name","defualt name")} </Text>
            <Text> {this.getParam("description","default desc")} </Text>
            <Image style={{width: 250, height: 250}} source={{uri: this.getParam("image","default image")}}/>
            <Text> {this.getParam("location","default location")} </Text>
        </View>  
      );
    }
  }

const styles = StyleSheet.create({
    art_container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});
