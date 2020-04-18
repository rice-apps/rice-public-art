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
             {/* Year container */}
              <View style={{top:10}}>
                 <Text style={styles.year}> {getYear(index)} </Text>
              </View>
              {/* Month container */}
              <View style={{flexDirection: "row", justifyContent:"space-evenly", top:10}}>
                <TouchableOpacity style = {{width:"30%"}} onPress={()=> this.props.increment(-1)}>
                  <Text style={[styles.minor,{textAlign: "center"}]}>   {lmonth}   </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{alignSelf:'center', width:"30%"}} onPress={()=> this.props.increment(0)}>
                    <Text style={styles.major}>{cmonth}</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{width:"30%"}} onPress={()=> this.props.increment(1)}>
                    <Text style={[styles.minor,{textAlign: "center"}]}>   {rmonth}   </Text>
                </TouchableOpacity>              
              </View>
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
        year: {
          textAlign: "left",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: -10,
          marginLeft: 20,
          fontFamily:"aktiv-grotesk-bold"
        },
        minor: {
          fontWeight: '100',
          fontSize: 16,
          //fontFamily:"aktiv-grotesk-regular"
        },
        major: {
            fontWeight: '400',
            textAlign: "center",
            fontSize: 18,
            fontFamily:"aktiv-grotesk-regular"
          },
      });