import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import MapView, { Callout } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Image, Button, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../AUTHENTICATION.js';

const colors = ["rgb(0, 50, 160)", "rgb(230, 60, 0)", "rgb(60, 160, 15)", "rgb(90, 165, 245)", "rgb(255, 135, 0)", "rgb(155, 210, 0)"]

const getRandomColor = function () {
  return colors[Math.floor(Math.random() * colors.length)]
}

class MapScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Map",
  })
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      userLocation: {
        latitude: 29.718261782636628,
        longitude: -95.40130750038287,
      },
      destination: {
        latitude: 29.718261782636628,
        longitude: -95.40130750038287,
      },
      showRoute: false,
      routeDuration: 0,
    };
  }
  // Fires when componenet is initially set/mounted
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)
      console.log(lat, long);
      this.setState({
        userLocation: {
          latitude: lat,
          longitude: long
        }
      })
    },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });

    //Make a fetch call
    fetch('http://moody-backend.herokuapp.com/campusArt/allArt', { method: 'GET' })
      .then(response => response.json()) // Get json of response
      .then((responseJson) => {
        console.log("response", responseJson.data)
        // Adjust state to reflect loaded status / store data from response
        this.setState({
          loading: false,
          data: responseJson.data
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          showsUserLocation={true}
          initialRegion={{
            latitude: 29.717031,
            longitude: -95.402857,
            latitudeDelta: 0.03,
            longitudeDelta: 0.015,
          }}>
          {
            this.state.data.map(art => {
              const artColor = getRandomColor()
              console.log("Making marker")
              return (
                <Marker
                  key={art.name}
                  coordinate={{ latitude: art.location.lat, longitude: art.location.lon }}
                  title={art.name}
                  image={require('../assets/Pin.png')}
                  onPress={() =>
                    this.setState({
                      destination: {
                        latitude: art.location.lat,
                        longitude: art.location.lon
                      }
                    })
                  }
                >
                  <Callout onPress={() => console.log('Callout pressed')} tooltip={true}>
                    <View style={[styles.calloutView, { backgroundColor: artColor }]}>
                      <Image style={styles.calloutImage} source={{ uri: art.image }} />
                      <View style={styles.calloutText}>
                        <Text style={styles.calloutTitle}>{art.name}</Text>
                        <Text style={styles.calloutDescription}>{art.description}</Text>
                      </View>
                    </View>
                    <View style={[styles.calloutArrow, { borderTopColor: artColor }]}></View>
                  </Callout>
                </Marker>
              )
            })
          }
          {this.state.showRoute ?
            <MapViewDirections
              origin={this.state.userLocation}
              destination={this.state.destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={7}
              strokeColor='rgb(100, 100, 200)'
              mode='WALKING'
              onReady={result => {
                this.setState({
                  routeDuration: Math.round( result.duration * 10) / 10 // round to one decimal place
                })
              }}
            /> : null
          }
        </MapView>
        <View style={styles.overMapView}>
          <Button
            style={styles.actionButton}
            title={this.state.showRoute ? 'Hide Route' : 'Show Route'}
            onPress={() => {
              console.log("PRESSED");
              this.setState({
                showRoute: !this.state.showRoute,
              });
            }} 
          />
          {this.state.showRoute ? <Text>Distance: {this.state.routeDuration} min</Text> : null}
        </View>
      </View >
    );
  }
}

const MapNavigator = createStackNavigator({
  Home: {
    screen: MapScreen,
  },
})
export default MapNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: -1
  },
  calloutView: {
    padding: 0,
    borderRadius: 10,
    overflow: 'hidden'
  },
  calloutText: {
    width: 250,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  calloutTitle: {
    fontSize: 24,
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  calloutDescription: {
    color: 'white'
  },
  calloutArrow: {
    borderTopWidth: 20,
    borderRightWidth: 15,
    borderLeftWidth: 15,
    width: 10,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    marginLeft: 'auto',
    marginRight: 'auto',
    transform: [{ translateY: -2 }]
  },
  calloutImage: {
    width: 250,
    height: 125,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0
  },
  actionButton: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 10,
    left: 10,
    zIndex: 10,
  },
  overMapView: {
    position: 'absolute',//use absolute position to show button on top of the map
    bottom: '5%', //for center align
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  // overMapViewRight: {
  //   position: 'absolute',//use absolute position to show button on top of the map
  //   bottom: '5%', //for center align
  //   // alignSelf: 'flex-end', //for align to right
  //   right: '10%',
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  //   padding: 10,
  // }
});