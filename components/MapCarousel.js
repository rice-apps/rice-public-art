import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window');

export default class MapCarousel extends React.Component {
    constructor(props){
        super(props);
        this.carousel =  <Carousel 
            ref={(c) => { this._carousel = c; }}
            data={this.props.data}
            renderItem={this._renderItem}
            sliderWidth={400}
            itemWidth={100}
        />
    }
    _renderItem = ({item, index}) => {
        return (
            <View style={[styles.calloutContainer]}>
            <View style={[styles.calloutView, { backgroundColor: this.props.data[this.props.calloutIndx].colorCode }]}>
              <ImageBackground style={styles.calloutImage} source={{ uri: this.props.data[this.props.calloutIndx].image }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={[styles.closeCallout, { marginLeft: 10 }]}>
                    <Button title={"X"} onPress={() => this.setState({ showCallout: false })} />
                  </View>
                  <Text style={styles.calloutTitle}>
                    {this.props.data[this.props.calloutIndx].abbreviatedName}
                  </Text>
                  <View style={[styles.closeCallout, { marginRight: 10 }]}>
                    <Button
                      title={"i"}
                      onPress={() => {
                        this.props.navigation.navigate('Details', {
                          name: this.props.data[this.props.calloutIndx].name,
                          description: this.props.data[this.props.calloutIndx].description,
                          image: this.props.data[this.props.calloutIndx].image,
                        })
                      }}
                    />
                  </View>
                </View>
              </ImageBackground>
              <View style={styles.calloutText}>
                {(this.props.userLocation != null && this.props.destination != null) ?
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
        );
    }

    render () {
        return (
            this.carousel
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
    calloutContainer: {
      bottom: 0,
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
      marginTop: 10,
    },
    calloutText: {
      width: 340,
      padding: 20,
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
      height: 150,
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
      marginRight: 'auto',
    },
    overMapView: {
      position: 'absolute',//use absolute position to show button on top of the map
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
    },
  });