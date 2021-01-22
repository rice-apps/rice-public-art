import React from 'react';
import { ImageBackground, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from 'react-navigation-stack'
import MapView, { Callout } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Image, Button, Dimensions, TouchableWithoutFeedback } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../AUTHENTICATION.js';
import Topbar from '../components/Topbar.js';
import DetailsScreen from './Details.js';
import { COLORS, BLUE } from '../COLORS.js';
import distance from "../util/distance.js";

const { width, height } = Dimensions.get('window');

function smartColor(artPieces){  
  for(var i = 0; i < artPieces.length; i++){
    var artPiecesCopy = Array.from(artPieces);
    //Sort artPiecesCopy from closest to farthest
    artPiecesCopy.sort((a,b)=>{
        var aloc = a.location; var bloc = b.location; var iloc = artPieces[i].location;
        var d1 = distance(aloc.lat,aloc.lon,  iloc.lat,iloc.lon)
        var d2 = distance(bloc.lat,bloc.lon,  iloc.lat,iloc.lon)
        return d1-d2
    })
    var possibleColors = new Set(COLORS)
    //Remove possible colors that are close
    for(var j=0; j < artPiecesCopy.length; j++){
      if (possibleColors.size == 1) break;
      if (artPiecesCopy[j].colorCode) possibleColors.delete(artPiecesCopy[j].colorCode);
    }
    //Pick a possible color deterministically (so it's conistent accros loads)
    possibleColors = Array.from(possibleColors);
    possibleColors.sort();
    var color = possibleColors[i % possibleColors.length];
    //Set color
    artPieces[i].colorCode = color;
  }
}
class MapScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Topbar text="Campus"></Topbar>,
    headerStyle: {
      backgroundColor: BLUE,
    },
  })
  getParam(param,def){
    // console.log("getting param")
    // console.log(param)
    // console.log(this.props.navigation.getParam(param,def))
    return this.props.navigation.getParam(param,def)
  } 
  constructor(props) {
    super(props);
    // console.log("propss", this.getParam("destination"))
    this.state = {
      loading: true,
      data: [],
      destination: this.getParam("destination"),
      showRoute: this.getParam("showRoute",false),
      routeDuration: null,
      showCallout: false,
      calloutIndx: null,
      fromDetails: false,
    };
    this.mapView = null;
    this.userLocation = null;
  }

  componentDidMount() {
    const didFocus = this.props.navigation.addListener(
      'willFocus',
      payload => {
        var params
        if (payload.action && payload.action.action) {
          params = payload.action.action.params
        }
        if(params) {
          // Navigated here from the art info page
          // Update state to show callout for appropriate art piece
          this.setState({
            showCallout: true,
            fromDetails: true,
            calloutIndx: params.index,
            showRoute: false,
            destination: {
              latitude: params.location.lat,
              longitude: params.location.lon
            }
          })
          // Center on artpiece if data already loaded
          if (this.state.data.length > 0) {
            let art = this.state.data[params.index];
            this.mapView.animateToRegion({
              latitude: art.location.lat - this.mapView.props.initialRegion.latitudeDelta * 0.08,
              longitude: art.location.lon,
              latitudeDelta: this.mapView.props.initialRegion.latitudeDelta * 0.5,
              longitudeDelta: this.mapView.props.initialRegion.longitudeDelta * 0.5
            });
          }
        }
      }
    );
    // console.log("passed props", this.props.navigation.state)
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)
      this.userLocation = {
        latitude: lat,
        longitude: long
      }
    },
      (error) => console.log(JSON.stringify(error)),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });

    //Make a fetch call
    fetch('https://moody-backend-273918.uc.r.appspot.com/campusArt/allArt', { method: 'GET' })
      .then(response => response.json()) // Get json of response
      .then((responseJson) => {
        smartColor(responseJson.data);
        this.setState({
          data: responseJson.data.map((art, i) => {
            art.abbreviatedName = art.name
            if (art.name.length > 15) {
              art.abbreviatedName = art.name.substring(0, 15) + '...'
            }
            return art;
          }),
          loading: false,
        }, () => {
          if(this.state.fromDetails) {
            console.log("Centering!")
            let art = this.state.data[this.state.calloutIndx];
            this.mapView.animateToRegion({
              latitude: art.location.lat - this.mapView.props.initialRegion.latitudeDelta * 0.08,
              longitude: art.location.lon,
              latitudeDelta: this.mapView.props.initialRegion.latitudeDelta * 0.8,
              longitudeDelta: this.mapView.props.initialRegion.longitudeDelta * 0.8
            });
          }
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any
    }

  route(){

    let location = this.getParam("location")
    let index = this.getParam("index") // CAUTION: This might be deprecated with filtering!!!!

    // console.log("location", location)
    // console.log("index", index)
    const resetAction = StackActions.reset({
      index: 0,
      //Navigates to Home when you click back to Art or Map
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    //this runs the action
this.props.navigation.dispatch(resetAction);
    // console.log("location2", location)
    // console.log("index2", index)

    this.props.navigation.navigate("Map", {
      "location": location,
      "index": index      }
    )
  }

  render() {
    let markers = [];

    for (let i = 0; i < this.state.data.length; i++) {
      const art = this.state.data[i];
      markers.push(
        <Marker
          key={art.name}
          coordinate={{ latitude: art.location.lat, longitude: art.location.lon }}
          title={art.name}
          isPreselected={false}
          onSelect={() => {
            this.setState({
              showRoute: false,
              showCallout: true,
              routeDuration: null,
              calloutIndx: i,
              destination: {
                latitude: art.location.lat,
                longitude: art.location.lon
              }
            })
            this.mapView.animateToRegion({
              latitude: art.location.lat - this.mapView.props.initialRegion.latitudeDelta * 0.08,
              longitude: art.location.lon,
              latitudeDelta: this.mapView.props.initialRegion.latitudeDelta * 0.8,
              longitudeDelta: this.mapView.props.initialRegion.longitudeDelta * 0.8
            });
          }}
          onDeselect={()=> this.setState({showCallout: false})}
          centerOffset={{ x: 0, y: -25 }}
        >
          <Image source={require('../images/mapIcon.png')} style={{ height: 50, width: 50, tintColor: art.colorCode }} />
        </Marker>

      )
    }
    // console.log("calloutInd", this.state.calloutIndx)
    // console.log("data", this.state.data)
    // console.log("finished", this.state.finished)
    // console.log("show route", this.state.showRoute)
    // console.log("location", this.state.location)


    // let callout = 

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
          onUserLocationChange={locationChangedEvent => {
            if (locationChangedEvent.nativeEvent.coordinate){
              this.userLocation = {
                latitude: locationChangedEvent.nativeEvent.coordinate.latitude,
                longitude: locationChangedEvent.nativeEvent.coordinate.longitude
              }
            }
          }}
        >
          {markers}
          {
            this.state.showRoute  ?
              <MapViewDirections
                origin={this.userLocation}
                destination={this.state.destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={7}
                strokeColor='rgb(100, 100, 200)'
                mode='WALKING'
                onReady={result => {
                  this.setState({
                    routeDuration: Math.round(result.duration)
                  })
                  // Center map on route
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: (width / 10),
                      bottom: (height / 10),
                      left: (width / 10),
                      top: (height / 10),
                    }
                  });
                }}
              /> : null
          }
        </MapView>
        {
          (this.state.showCallout && !this.state.loading) ? (
            <View style={[styles.calloutContainer]}>
              <View style={styles.calloutView}>
                <TouchableHighlight onPress={() => {
                            this.props.navigation.navigate('Details', {
                              name: this.state.data[this.state.calloutIndx].name,
                              description: this.state.data[this.state.calloutIndx].description,
                              image: this.state.data[this.state.calloutIndx].image,
                              location: this.state.data[this.state.calloutIndx].location,
                              artist: this.state.data[this.state.calloutIndx].artist,
                              year: this.state.data[this.state.calloutIndx].year,
                              index: this.state.calloutIndx
                            })
                          }}
                >
                <ImageBackground style={styles.calloutImage} source={{ uri: this.state.data[this.state.calloutIndx].image }}>
                <LinearGradient
                    colors={['rgba(0, 0, 0, .8)', 'rgba(0, 0, 0, .7)', 'rgba(0, 0, 0, .3)','rgba(0, 0, 0, 0)']}
                    style={{borderRadius: 5}}
                 > 
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Text style={[styles.calloutTitle,{margin:10}]}>
                        {this.state.data[this.state.calloutIndx].name}
                      </Text>
                    </View>
                  </LinearGradient>
                </ImageBackground>
                </TouchableHighlight>
                <TouchableHighlight 
                  onPress={() => {
                    this.setState({
                      showRoute: !this.state.showRoute,
                    });
                  }}
                  underlayColor = {'#eeeeee'}
                >
                  <View style={styles.calloutButtonView}>
                  <Text style={{fontSize: 18,fontWeight: 'bold'}}>
                    {this.state.showRoute ? 'Hide Route' : 'Show Route'}
                    </Text>
                  {this.state.showRoute && this.state.routeDuration != null?
                      <Text style={{ textAlign: 'center', margin: 0, padding: 0 }}>
                        Distance: {this.state.routeDuration} min
                      </Text> : null}
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          ) : null
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
    bottom: 10,
    position: 'absolute'
  },
  calloutView: {
    padding: 0,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  closeCallout: {
    backgroundColor: 'white',
    borderRadius: 40,
    height: 40,
    width: 40,
    marginTop: 10,
  },
  calloutButtonView: {
    height:55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutTitle: {
    fontSize: 24,
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  calloutImage: {
    width: width * 0.95,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0
  },
  overMapView: {
    position: 'absolute',//use absolute position to show button on top of the map
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
});