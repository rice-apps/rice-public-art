import React from 'react';
import styles from '../source/stylesheets/DisplayArt.js';
import { Text, View, Image} from 'react-native';

export default class Card extends React.Component {
    render() {
      // Remove "https:", eventually (image componenet)
        return (
          <View style={styles.wrapper}>
            <Text> {this.props.name} </Text>
            <Text> {this.props.description} </Text>
            <Image style={{width: 250, height: 250}} source={{uri: this.props.image}}/>
            <Text> {this.props.location} </Text>
          </View>
        );
      }
    }
