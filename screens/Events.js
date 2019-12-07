import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import EventCard from '../components/EventCard.js';
import Topbar from '../components/Topbar.js';
import {colors} from '../COLORS.js';
console.log(colors);

import { createStackNavigator } from 'react-navigation-stack'
import EventDetailsScreen from './EventDetails.js';
 
class EventsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Topbar text="Events"/>,
  })
  // Set default state (no data, and loading)
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data:[{name:"New: Yellow, Purple, Blue, Red",
             date: new Date('November 31, 2019'),
             time: "6:00PM - 8:00PM",
             description: "colors are very cool!",
             location: "Moody Center",
             image: "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
            }, 
            {name:"The Skyfall",
            date: new Date('November 13, 2019'),
            time: "11:00PM - 4:00AM",
            description: "your soul will be sold",
            location: "Sky Space",
            image: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
           }, 
          ]
     };
   }
   // Fires when componenet is initially set/mounted
    componentDidMount(){
      //Make a fetch call
      // fetch('http://moody-backend.herokuapp.com/general/annoncements', {method: 'GET'})
      //   .then(response => response.json()) // Get json of response
      //   .then((responseJson)=> { 
      //       // Adjust state to reflect loaded status / store data from response
      //       this.setState({
      //         loading: false,
      //         data: responseJson.data
      //      })
      //   })
      //   .catch(error=>console.log(error)) //to catch the errors if any
    }
    render() {
      // Check if data is loaded
      if(this.state.loading){ 
        // Display something to inform user data is loading
        return( 
          <View> 
            <Text> Loading... </Text>
          </View>
      )} else {
        // We got the data
          // Here we have to do somoething with this.state.data to reflect in the return statement
        // Return display formating data into Piece componenets
        let artComponents = []
        //let component
        for(let i = 0; i < this.state.data.length; i++){
          var content = this.state.data[i]
          artComponents.push(<EventCard 
            key = {'card'+i} 
            name={content.name} 
            description={content.description} 
            image={content.image} 
            time={content.time} 
            location={content.location} 
            color = {colors[i%colors.length]}
            date = {content.date}
            navigation = {this.props.navigation}> 
          </EventCard>)
        }
        return(
        <ScrollView style={styles.scrollView}>
            {artComponents}
         </ScrollView>
        );
      }
    }
}

export default createStackNavigator({
    List: {
        screen: EventsScreen,
    },    
    Details: {
        screen: EventDetailsScreen,
    }
});

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollView: {
      marginLeft:"auto", 
      marginRight:"auto",
      width:"95%"
    },
  });