import React from 'react';
import MapView, { Callout } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Image, Button, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../AUTHENTICATION.js';

const colors = ["rgb(0, 50, 160)", "rgb(230, 60, 0)", "rgb(60, 160, 15)", "rgb(90, 165, 245)", "rgb(255, 135, 0)", "rgb(155, 210, 0)"]

const getRandomColor = function () {
  return colors[Math.floor(Math.random() * colors.length)]
}

const destination = {latitude: 29.716484587132125, longitude: -95.40425174120776};

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      userLocation: {
        latitude: 29.718261782636628,
        longitude: -95.40130750038287,
      },
      showRoute: false
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
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

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
            this.state.data.map(art => 
              {
                const artColor = getRandomColor()
                return (
              <Marker
                key={art.name}
                coordinate={{ latitude: art.location.lat, longitude: art.location.lon }}
                title={art.name}
                image={require('../assets/Pin.png')}>
                <Callout tooltip={true}>
                  <View style={[styles.calloutView, {backgroundColor: artColor}]}>
                    <Image style={styles.calloutImage} source={{ uri: art.image }} />
                    <View style={styles.calloutText}>
                      <Text style={styles.calloutTitle}>{art.name}</Text>
                      <Text style={styles.calloutDescription}>{art.description}</Text>
                    </View>
                    <Text style={[styles.routeButton, {backgroundColor: artColor}]}
                      onPress={() => this.setState({showRoute:true})}>
                      {this.state.titleText}
                      Route
                    </Text>
                  </View>
                  <View style={[styles.calloutArrow, {borderTopColor: artColor}]}></View>
                </Callout>
              </Marker>
            )})
          }
          {this.state.showRoute ? 
            <MapViewDirections
              origin={this.state.userLocation}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={7}
              strokeColor='rgb(100, 100, 200)'
              mode='WALKING'
            /> : null
         }
        </MapView>
      </View>
    );
  }
}

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
  },
  calloutView: {
    padding: 0,
    borderRadius: 10,
    overflow: 'hidden'
  },
  calloutText: {
    width: 300,
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
    width: 300,
    height: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0
  },
  routeButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    padding: 10
  }
});