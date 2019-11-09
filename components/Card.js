import React from 'react';
import { Text, ImageBackground, StyleSheet, TouchableHighlight} from 'react-native';

export default class Card extends React.Component {
    render() {
        return (
          <TouchableHighlight style={styles.touchable}
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

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});