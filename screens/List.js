import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, FlatList, ActivityIndicator} from 'react-native';
import Card from './Card.js';
import { TouchableHighlight } from 'react-native-gesture-handler';
 
export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Art List",
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
          <View style={styles.container}> 
            <Text> Loading... </Text>
          </View>
      )} else {
        // We got the data
          // Here we have to do somoething with this.state.data to reflect in the return statement
        //console.log("loaded data:",this.state.data);
        // Return display formating data into Piece componenets
        let artText = []
        //let component
        for(let i = 0; i < this.state.data.length; i++){
          var content = this.state.data[i]
          artText.push(<Card 
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
            {artText}
         </ScrollView>
        );
      }
    }
  }
  
  // Style
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollView: {
      padding: 30,
      flex: 5,
    },
  });
