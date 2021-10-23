import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableHighlight, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { truncate } from '../util/stringlogic.js'

export default class Card extends React.Component {
    render() {
        // console.log("route function", this.props.routeTo_art())
        return (
          <TouchableHighlight style={styles.touchable}
            underlayColor="transparent"
            style = {styles.container}
            onPress={() => 
              this.props.navigation.navigate('Details',this.props)
            }>
            <ImageBackground style={{borderRadius:100, height: 200, width:"100%", marginTop:10}}  imageStyle={{ borderRadius: 10, width:"100%"}} source={{uri: this.props.image}}>
              <LinearGradient
                colors={['rgba(0, 0, 0, .95)', 'rgba(0, 0, 0, .7)', 'rgba(0, 0, 0, .4)','rgba(0, 0, 0, 0)']}
                style={{ padding: 15, borderRadius: 5 }}
              > 
              <Text style={{textAlign: "left", fontFamily: "aktiv-grotesk-regular", color:"white", textTransform: "uppercase", fontSize: 25, marginTop:-10, marginLeft:-5}}> {truncate(this.props.artist,20)} </Text>
              <Text style={{textAlign: "left", fontFamily: "aktiv-grotesk-regular", color:"white", textTransform: "uppercase", fontSize: 15, marginTop:2, marginLeft:-5}}> {truncate(this.props.name,20)} </Text>
              </LinearGradient>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .1)', 'rgba(0, 0, 0, .5)', 'rgba(0, 0, 0, .9)']}
                style={{ padding: 15, flex: 1, justifyContent: 'flex-end', borderRadius: 5 }}
              > 
              <View style = {{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{textAlign: "right", color:"white", fontSize: 20, marginBottom:0, marginRight:0}}>{(this.props.minutes != null? (this.props.minutes > 60 && ">60" || this.props.minutes) : null)} min</Text>
                <Image 
                  source = {require('../images/clockIcon.png')}
                  style = {{width:16,height:16,marginTop:4,marginLeft:5}}
                />
              </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableHighlight>
        );
      }
    }

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});