import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import Topbar from '../components/Topbar.js';

class EventsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Topbar text="Events"></Topbar>
  })
  render() {
    return (
      <View style={styles.art_container}>
        <Text> Moody is on fire! </Text>
      </View>
    );
  }
}

const EventsNavigator = createStackNavigator({
  Home: {
    screen: EventsScreen,
  }
})
export default EventsNavigator;

const styles = StyleSheet.create({
    art_container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});
