import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, ActivityIndicator, Alert } from 'react-native';
import Card2 from '../components/Card2.js';
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
            data: []
        };
    }

    // Fires when componenet is initially set/mounted
    componentDidMount() {
        this.setState({
            loading: false,
            data: [{
                name: 'Natasha Romanoff',
                image: 'https://cdn.pocket-lint.com/r/s/1200x/assets/images/156367-tv-news-feature-every-marvel-movie-and-show-to-watch-before-black-widow-image10-9lcwr2ywcm.jpg',
                description: ""
            },
            {
                name: 'Steve Rogers',
                image: 'https://media.distractify.com/brand-img/n2YUu1302/0x0/steve-rogers-1616186121342.jpeg',
                description: ""
            },
            {
                name: 'Yelena Belova',
                image: 'https://am21.mediaite.com/tms/cnt/uploads/2020/11/Were-Going-To-See-More-of-Yelena-as-Florence-Pugh-Heads-To-Hawkeye-1200x675.jpg',
                description: ""
            },
            {
                name: 'Shang Chi',
                image: 'https://www.gannett-cdn.com/presto/2021/07/19/USAT/72386be9-0d52-45d0-8fc8-1be5f02845e9-marvel-shang-chi.png?width=660&height=372&fit=crop&format=pjpg&auto=webp',
                description: ""
            },
            ]
        })
    }

    generateCards() {
        var cards = this.state.data.map((content, i) =>
            <Card2
                key={'card' + i}
                name={content.name}
                image={content.image}
                index={i}
            />)
        return cards


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