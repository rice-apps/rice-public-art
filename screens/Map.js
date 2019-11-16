import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import MapView, { Callout } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Image, Button, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../AUTHENTICATION.js';
import Topbar from '../components/Topbar.js';
import DetailsScreen from './Details.js';

const { width, height } = Dimensions.get('window');
const colors = ["rgb(0, 50, 160)", "rgb(230, 60, 0)", "rgb(60, 160, 15)", "rgb(90, 165, 245)", "rgb(255, 135, 0)", "rgb(155, 210, 0)"]

const getRandomColor = function () {
  return colors[Math.floor(Math.random() * colors.length)]
}

class MapScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Topbar text="Campus"></Topbar>
  })
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      userLocation: null,
      destination: null,
      showRoute: false,
      routeDuration: 0,
      showCallout: false,
      calloutIndx: null
    };
    this.mapView = null;
  }

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
          data: responseJson.data.map(art => {
            art.colorCode = getRandomColor();
            return art;
          })
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any
  }

  render() {
    let markers = []

    for (let i = 0; i < this.state.data.length; i++) {
      const art = this.state.data[i];
      markers.push(
        <Marker
          key={art.name}
          coordinate={{ latitude: art.location.lat, longitude: art.location.lon }}
          title={art.name}
          onPress={() =>
            this.setState({
              showRoute: false,
              showCallout: true,
              calloutIndx: i,
              destination: {
                latitude: art.location.lat,
                longitude: art.location.lon
              }
            })
          }
          centerOffset={{x: 24, y: -24}}
        >
          <Image source={require('../images/moodyLogo.png')} style={{height: 50, width:50}} />
        </Marker>

      )
    }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          showsUserLocation={true}
          ref={c => this.mapView = c}
          initialRegion={{
            latitude: 29.717031,
            longitude: -95.402857,
            latitudeDelta: 0.03,
            longitudeDelta: 0.015,
          }}
        >
          {markers}

          {
            this.state.showRoute ?
              <MapViewDirections
                origin={this.state.userLocation}
                destination={this.state.destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={7}
                strokeColor='rgb(100, 100, 200)'
                mode='WALKING'
                onReady={result => {
                  this.setState({
                    routeDuration: Math.round(result.duration * 10) / 10 // round to one decimal place
                  })
                }}
              /> : null
          }
        </MapView>
        {
          this.state.showCallout ? (
            <View style={[styles.calloutContainer]}>
              <View style={[styles.closeCallout]}>
                <Button title={"X"} onPress={() => this.setState({showCallout: false})}/>
              </View>
              <View style={[styles.calloutView, { backgroundColor: this.state.data[this.state.calloutIndx].colorCode }]}>
                <Image style={styles.calloutImage} source={{ uri: this.state.data[this.state.calloutIndx].image }} />
                <View style={styles.calloutText}>
                  <Text style={styles.calloutTitle}>{this.state.data[this.state.calloutIndx].name}</Text>
                  <Text style={styles.calloutDescription}>{this.state.data[this.state.calloutIndx].description}</Text>
                  <Text style={styles.calloutMoreInfo} onPress={() =>
                    this.props.navigation.navigate('Details', {
                      name: this.state.data[this.state.calloutIndx].name,
                      description: this.state.data[this.state.calloutIndx].description,
                      image: this.state.data[this.state.calloutIndx].image,
                    })
                  }>{'\n'}Tap for more info</Text>
                  {(this.state.userLocation != null && this.state.destination != null) ?
                    <View style={styles.routeButton}>
                      <Button
                        style={{ margin: 0, padding: 0 }}
                        title={this.state.showRoute ? 'Hide Route' : 'Show Route'}
                        onPress={() => {
                          this.setState({
                            showRoute: !this.state.showRoute,
                          });
                        }}
                      />
                      {this.state.showRoute ?
                        <Text style={{ textAlign: 'center', margin: 0, padding: 0 }}>
                          Distance: {this.state.routeDuration} min
                      </Text> : null}
                    </View> : null
                  }
                </View>
              </View>
            </View>

          ) : (
              null
            )
        }
        <View style={[styles.overMapView, { top: '3%', right: '5%' }]}>
          <Button
            title='Recenter'
            onPress={() => {
              this.mapView.animateToRegion(this.mapView.props.initialRegion)
            }}
          />
        </View>
      </View >
    );
  }
}

const MapNavigator = createStackNavigator({
  Home: {
    screen: MapScreen,
  },
  Details: {
    screen: DetailsScreen,
  }
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
  calloutContainer: {
    bottom: 15,
    position: 'absolute'

  },
  calloutView: {
    padding: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
  closeCallout: {
    backgroundColor: 'white',
    borderRadius: 40,
    height: 40,
    width: 40,
    marginBottom: 10
  },
  calloutText: {
    width: 340,
    padding: 20,
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
  calloutMoreInfo: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10
  },
  calloutImage: {
    width: 340,
    height: 125,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0
  },
  routeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    // height: 60,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  overMapView: {
    position: 'absolute',//use absolute position to show button on top of the map
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
});