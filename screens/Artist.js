import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, ActivityIndicator, Alert } from 'react-native';
import Card from '../components/Card.js';
import Topbar from '../components/Topbar.js';
import { LIGHT_BLUE } from '../COLORS.js'

import * as Font from 'expo-font';

import { createStackNavigator } from 'react-navigation-stack'
import DetailsScreen from './Details.js';
import distance from '../util/distance.js'
import { withOrientation } from 'react-navigation';

import Modal from 'react-native-modal';
import { CheckBox } from 'react-native-elements';
import { SYSTEM_BRIGHTNESS } from 'expo-permissions';

class ArtistScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerLeft: <Topbar text="Artist" />,

            headerStyle: {
                backgroundColor: LIGHT_BLUE,
            },
        };
    };


    // componentWillMount() {
    //     this.props.navigation.setParams({ showFilter: this._showFilter });
    // }

    // _showFilter = () => {
    //     this.setState({ showFilterMenu: true });
    //     //console.log("Showing filter menu");
    // }

    // Set default state for Homescreen (no data, and loading)
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            content: []
        };
    }

    // Fires when componenet is initially set/mounted
    componentDidMount() {
        this.setState({
            loading: false,
            data: [{
                name: 'Jane Doe',
                pieces: 'A'
            },
            {
                name: 'John Smith',
                pieces: 'B'
            },
            {
                name: 'Mary Jane',
                pieces: 'C'
            }]
        })
    }

    generateCards() {
        // var cards = this.state.data.map((content, i) =>
        //     <Card
        //         key={'card' + i}
        //         name={content.name}
        //         pieces={content.pieces}
        //         index={i}
        //     />)


        // return cards;
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

                </View>
            );
        }
    }
}

export default createStackNavigator({
    Artist: {
        screen: ArtistScreen,
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
});