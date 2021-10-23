import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, ActivityIndicator, Alert, Pressable } from 'react-native';
import Card from '../components/Card.js';
import Topbar from '../components/Topbar.js';
import { LIGHT_ORANGE } from '../COLORS.js'

import * as Font from 'expo-font';

import { createStackNavigator } from 'react-navigation-stack'
import DetailsScreen from './Details.js';
import distance from '../util/distance.js'
import { withOrientation } from 'react-navigation';

import Modal from 'react-native-modal';
import { CheckBox } from 'react-native-elements';
import { SYSTEM_BRIGHTNESS } from 'expo-permissions';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerLeft: <Topbar text="Art" />,
      headerRight: () => (
        // <Button 
        //   onPress={navigation.getParam('showFilter')}
        //   color="#fff">
            
        // </Button>
        <Pressable style={styles.button} onPress={navigation.getParam('showFilter')}>
      <Text style={styles.text}>Filters</Text>
    </Pressable>
  
      ),
      headerStyle: {
        backgroundColor: LIGHT_ORANGE,
      },
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ showFilter: this._showFilter });
  }

  _showFilter = () => {
    this.setState({ showFilterMenu: true });
    //console.log("Showing filter menu");
  }

  // Set default state for Homescreen (no data, and loading)
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      userLocation: null,
      showFilterMenu: false,
      filters: {
        indoors: false,
        outdoors: false,
        permanent: false,
        temporary: false
      }
    };
  }

  // Fires when componenet is initially set/mounted
  componentDidMount() {
    //Make a fetch call
    fetch('https://moody-backend-273918.uc.r.appspot.com/campusArt/allArt', { method: 'GET' })
      .then(response => response.json()) // Get json of response
      .then((responseJson) => {
        // Adjust state to reflect loaded status / store data from response

        this.setState({
          loading: false,
          data: responseJson.data
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any

    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      this.setState({
        userLocation: {
          latitude: lat,
          longitude: long
        }
      })
    },
      (error) => console.log(JSON.stringify(error)),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
  }

  generateCards() {
    // console.log(this.state.data)
    var cards = this.state.data.map((content, i) =>
      this.shouldShowArtWithFilter(content) ?
        <Card
          key={'card' + i}
          name={content.name}
          description={content.description}
          image={content.image}
          artist={content.artist}
          location={content.location}
          year={content.year}
          index={i} // !!!!!!!!CAUTION: This might be deprecated if filtering is added!!!!!!!!
          // Assume a 20 min. per mile walking speed
          // This is on the high end because we are using a straight line approximation for the route
          // which underestimates the total distance
          minutes={this.state.userLocation != null ?
            Math.round(distance(this.state.userLocation.latitude, this.state.userLocation.longitude,
              content.location.lat, content.location.lon) * 20)
            : null}
          navigation={this.props.navigation}
        /> : null)
    if (this.state && this.state.userLocation && this.state.userLocation.latitude && this.state.userLocation.longitude) {
      var myloc = { lat: this.state.userLocation.latitude, lon: this.state.userLocation.longitude }
      cards.sort((a, b) => {
        if (a != null & b != null) {
          var aloc = a.props.location; var bloc = b.props.location;
          var d1 = distance(aloc.lat, aloc.lon, myloc.lat, myloc.lon)
          var d2 = distance(bloc.lat, bloc.lon, myloc.lat, myloc.lon)
          return d1 - d2
        }
      })
    }
    return cards;
  }
  toggleFilter(filterName) {
    let filters = this.state.filters
    var v = !filters[filterName]
    //Reset filters
    Object.keys(filters).forEach((key) => filters[key] = false)
    filters[filterName] = v
    if (this.generateCards().filter(x => x != null).length == 0) {
      //Alert user
      Alert.alert("No content", "Try selecting different filters");
      filters[filterName] = false;
    }
    this.setState({ filters: filters })
  }

  shouldShowArtWithFilter(content) {
    //console.log("********** FILTERING ***********")
    //console.log(content);
    if (content.indoors == false) {
      content.outdoors = true;
    }
    const filters = ['indoors', 'outdoors', 'permananent', 'temporary'];
    var passedFilter = false
    var allFiltersTrue = true
    var allFiltersFalse = true
    filters.forEach(filter => {
      //console.log(filter, this.state.filters[filter], content[filter]);
      if (this.state.filters[filter] && content[filter]) {
        passedFilter = true;
      }
      if (!this.state.filters[filter]) allFiltersTrue = false;
      if (this.state.filters[filter]) allFiltersFalse = false;
    })
    // don't exclude anything if nothing is checked
    // or if nothing is filtered out
    if (allFiltersFalse || allFiltersTrue) return true;
    return passedFilter;
  }

  render() {
    // Check if data is loaded
    if (this.state.loading) {
      // Display something to inform user data is loading
      return (
        <View style={{ height: "100%", width: "100%", alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )
    } else {
      // We got the data
      // Here we have to do somoething with this.state.data to reflect in the return statement
      // Return display formating data into Piece componenets

      return (
        <View>
          <ScrollView style={styles.scrollView}>
            {this.generateCards()}
          </ScrollView>
          <Modal
            isVisible={this.state.showFilterMenu}
            onSwipeComplete={() => this.setState({ showFilterMenu: false })}
            swipeDirection={['down']}
          >
            <View style={styles.filterMenu}>
              <Text style={styles.filterMenuTitle}>Filter Art</Text>
              <CheckBox
                title='Indoors'
                checked={this.state.filters.indoors}
                onPress={() => this.toggleFilter('indoors')}
                containerStyle={{ width: 225 }}
              />
              <CheckBox
                title='Outdoors'
                checked={this.state.filters.outdoors}
                onPress={() => this.toggleFilter('outdoors')}
                containerStyle={{ width: 225 }}
              />
              <CheckBox
                title='Permanent'
                checked={this.state.filters.permanent}
                onPress={() => this.toggleFilter('permanent')}
                containerStyle={{ width: 225 }}
              />
              <CheckBox
                title='Temporary'
                checked={this.state.filters.temporary}
                onPress={() => this.toggleFilter('temporary')}
                containerStyle={{ width: 225 }}
              />
              <Button testID={'close-button'} onPress={() => this.setState({ showFilterMenu: false })} title="Close" />
            </View>
          </Modal>
        </View>
      );
    }
  }
}

export default createStackNavigator({
  Home: {
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
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%"
  },
  filterMenu: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  filterMenuTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: LIGHT_ORANGE,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});