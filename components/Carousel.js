import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';

let data = ["JANUARY", "FEBRUARY", "MARCH"];

export default class TextCarousel extends React.Component {

    _renderItem = ({item, index}) => {
        return (
            <View >
                <Text >{ item }</Text>
            </View>
        );
    }

    render () {
        return (
            <Carousel 
              ref={(c) => { this._carousel = c; }}
              data={data}
              renderItem={this._renderItem}
              sliderWidth={400}
            itemWidth={100}
            />
        );
    }
}