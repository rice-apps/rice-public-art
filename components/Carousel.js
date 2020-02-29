import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Carousel from 'react-native-snap-carousel';

let currentDate = new Date() 
let currentMonth = currentDate.getMonth()
let currentYear = currentDate.getFullYear()
let months = ["JANUARY", "FEBRUARY", "MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
var data = [months[currentMonth]]
var monthsIntoFuture = 6
var monthsIntoPast = 5
var startIndex = monthsIntoPast 

function getYear(index){
    degrade_cutoff = startIndex - currentMonth
    upgrade_cutoff = degrade_cutoff + 12
    if (index  < degrade_cutoff) {
        return currentYear - 1
    } else if (index >= upgrade_cutoff){
        return currentYear + 1
    } else {
        return currentYear
    }
}

function getMonth(index){
    degrade_cutoff = startIndex - currentMonth
    upgrade_cutoff = degrade_cutoff + 12
    if (index  < degrade_cutoff) {
        return index - degrade_cutoff + 1 + 12
    } else if (index >= upgrade_cutoff){
        return index - degrade_cutoff + 1 - 12
    } else {
        return index - degrade_cutoff + 1
    } 
}

//Populate data into future
var i;
for (i = 1; i < monthsIntoFuture + 1; i++) { 
  d = currentMonth + i
  if (d < 12){
    data.push(months[d])
  } else {
    data.push(months[d-12])
  }
}

//Populate data into past
var i;
for (i = -1; i > -(monthsIntoPast+1); i--) { 
  d = currentMonth + i
  if (d > -1){
    data.unshift(months[d])
  } else {
    data.unshift(months[d+12])
  }
}

// Test; don't delte :(
// for (i=0; i < data.length; i++){
//     if (i == startIndex) {
//         console.log("------------------------")
//     }
//     console.log(data[i],getMonth(i),getYear(i))
//     if (i == startIndex) {
//         console.log("------------------------")
//     }
// }

export default class TextCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.carousel = (<Carousel 
                firstItem={startIndex}
                ref={(c) => { this._carousel = c; }}
                data={data}
                renderItem={this._renderItem}
                sliderWidth={400}
                itemWidth={120}
                onBeforeSnapToItem = { (new_index) => {
                    this.props.requestData(getMonth(new_index),getYear(new_index))
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