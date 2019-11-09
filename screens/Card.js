import React from 'react';
import styles from '../source/stylesheets/DisplayArt.js';
import { Text, View, Image, ImageBackground, TouchableHighlight} from 'react-native';

export default class Card extends React.Component {
    render() {
        return (
          <TouchableHighlight style={styles.wrapper}
            style = {styles.container}
            onPress={() => 
              this.props.navigation.navigate('Details',this.props)
            }>
            <ImageBackground style={{borderRadius:100, width: 300, height: 200}}  imageStyle={{ borderRadius: 25 }} source={{uri: this.props.image}}>
              <Text> {this.props.name} </Text>
              <Text> {this.props.description} </Text>
              <Text> {this.props.location} </Text>
            </ImageBackground>
          </TouchableHighlight>
        );
      }
    }

