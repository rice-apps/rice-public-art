import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Carousel from 'react-native-snap-carousel';

let currentDate = new Date()
let currentMonth = currentDate.getMonth()
let currentYear = currentDate.getFullYear()
let data = ["JANUARY", "FEBRUARY", "MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER","JANUARY", "FEBRUARY", "MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER","JANUARY", "FEBRUARY", "MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
let true_index = 0

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

true_index = getIndex(currentMonth,currentYear)

export default class TextCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.carousel = (<Carousel 
                firstItem={true_index}
                ref={(c) => { this._carousel = c; }}
                data={data}
                renderItem={this._renderItem}
                sliderWidth={400}
                itemWidth={120}
                onBeforeSnapToItem = { (new_index) => {
                    true_index = new_index
                    this.props.requestData(getMonth(true_index),getYear(true_index))
                    }
                }
                //onSnapToItem = {(index)=> {}}
            />
        )
    }    

    _renderItem = ({item, index}) => {
        return (
            <Text> ({index}) {item} </Text>
        );
    }
    render () {
        return (
            this.carousel
        );
    }
}