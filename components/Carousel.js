import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Carousel from 'react-native-snap-carousel';

let currentDate = new Date()
let currentMonth = currentDate.getMonth()
let currentYear = currentDate.getFullYear()
let data = ["JANUARY", "FEBRUARY", "MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER","JANUARY", "FEBRUARY", "MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER","JANUARY", "FEBRUARY", "MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];

function getMonth(index) {
    // janurary = 1
    return index%12+1
}

function getYear(index){
    return Math.floor(index/12) + currentYear - 1
}

function getIndex(month,year){
    index = (year-currentYear + 1)*12 + month
    return index
}

export default class TextCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.carousel = (<Carousel 
                ref={(c) => { this._carousel = c; }}
                data={data}
                renderItem={this._renderItem}
                sliderWidth={400}
                itemWidth={120}
                firstItem={getIndex(currentMonth,currentYear)}
                onSnapToItem = {(index)=> {this.props.requestData(getMonth(index),getYear(index))}}
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