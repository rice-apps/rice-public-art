import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {getMonthString,getYear} from '../util/datelogic.js';

export default class DiscreteCarousel extends React.Component {
    render() {
        let index = this.props.index
        lmonth = getMonthString(index-1)
        cmonth = getMonthString(index)
        rmonth = getMonthString(index+1)
        //shortYear = "'"+(getYear(index) - 2000)
        return (
          <View>
              <View style={{top:10}}>
                 <Text style={styles.title}> {getYear(index)} </Text>
              </View>
              <View style={{flexDirection: "row", justifyContent:'space-around', top:10}}>
                <TouchableOpacity onPress={()=> this.props.increment(-1)}>
                    <Text style={styles.minor}>{lmonth}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.props.increment(0)}>
                    <Text style={styles.major}>{cmonth}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.props.increment(1)}>
                    <Text style={styles.minor}>{rmonth}</Text>
                </TouchableOpacity>              
              </View>
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
        title: {
          textAlign: "left",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: -10,
          marginLeft: 20
        },
        minor: {
          fontWeight: '200',
          textAlign: "center",
          fontSize: 16
        },
        major: {
            felx:1,
            fontWeight: '400',
            textAlign: "center",
            fontSize: 18
        },
        calendarText: {
          textAlign: "center",
          fontSize: 25,
          fontWeight: '600'
        },
        extraInfo: {
          marginLeft: 10
        },
      });