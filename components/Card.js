import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableHighlight} from 'react-native';

export default class Card extends React.Component {
    render() {
        return (
          <TouchableHighlight style={styles.touchable}
            underlayColor="transparent"
            style = {styles.container}
            onPress={() => 
              this.props.navigation.navigate('Details',this.props)
            }>
            <ImageBackground style={{borderRadius:100, height: 200, width:"100%", marginTop:10}}  imageStyle={{ borderRadius: 10, width:"100%"}} source={{uri: this.props.image}}>
              <Text style={{textAlign: "left", color:"white", textTransform: "uppercase", fontSize: 30, marginTop:10, marginLeft:10}}> {this.props.name} </Text>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text style={{textAlign: "right", color:"white", fontSize: 20, marginBottom:10, marginRight:10}}>10 min. away</Text>
              </View>
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