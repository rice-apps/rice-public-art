import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import Card from '../components/Card.js';
import Topbar from '../components/Topbar.js';

import { createStackNavigator } from 'react-navigation-stack'
import DetailsScreen from './Details.js';

 
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Topbar text="Art"/>,
  })
  // Set default state for Homescreen (no data, and loading)
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data:[]
     };
   }
   // Fires when componenet is initially set/mounted
    componentDidMount(){
      //Make a fetch call
      fetch('http://moody-backend.herokuapp.com/moodyArt/allArt', {method: 'GET'})
        .then(response => response.json()) // Get json of response
        .then((responseJson)=> { 
            // Adjust state to reflect loaded status / store data from response
            this.setState({
              loading: false,
              data: responseJson.data
           })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
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
        //console.log("loaded data:",this.state.data);
        // Return display formating data into Piece componenets
        let artComponents = []
        //let component
        for(let i = 0; i < this.state.data.length; i++){
          var content = this.state.data[i]
          artComponents.push(<Card 
            key = {'card'+i} 
            name={content.name} 
            description={content.description} 
            image={content.image} 
            location={content.location} 
            text={content.text} 
            navigation = {this.props.navigation}> 
          </Card>)
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
        screen: HomeScreen,
    },    
    Details: {
        screen: DetailsScreen,
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