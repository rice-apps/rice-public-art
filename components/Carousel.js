import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Carousel from 'react-native-snap-carousel';

let data = ["JANUARY", "FEBRUARY", "MARCH","APRIL","MAY","JUNE","JULY","AUGUST","OCTOBER","NOVEMBER","DECEMBER"];

export default class TextCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.carousel = (<Carousel 
                ref={(c) => { this._carousel = c; }}
                data={data}
                renderItem={this._renderItem}
                sliderWidth={400}
                itemWidth={120}
            />
        )

    }
    _renderItem = ({item, index}) => {
        return (
            <View >
                <Button title = {item}
                    onPress = {()=>this._carousel.snapToItem(index, animated = true, fireCallback = true)}
                ></Button>
            </View>
        );
    }
    render () {
        return (
            this.carousel
        );
    }


}