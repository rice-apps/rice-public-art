import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder
} from 'react-native';

export default class SwipeGesture extends Component {
  componentWillMount() {
    this.PanResponder = PanResponder.create({
      /*
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        console.log(gestureState.vx, gestureState.vy)
        return Math.abs(gestureState.vy) == 0 && Math.abs(gestureState.dy) == 0  
      },*/
      onShouldBlockNativeResponder: () => false,
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        let x = gestureState.dx;
        let y = gestureState.dy;
        if (x == 0 && y == 0) {
          this.props.onSwipePerformed('press')
        } else if (Math.abs(gestureState.vx) > 0 && Math.abs(x) > Math.abs(y)) {
          if (x >= 0) {
            this.props.onSwipePerformed('right')
          }
          else {
            this.props.onSwipePerformed('left')
          }
        /*} else {
          if (y >= 0) {
            console.log("DOWN!")
            this.props.onSwipePerformed('down')
          }
          else {
            console.log("DOWN!")
            this.props.onSwipePerformed('up')
          }*/
        }
      }
    })
  }
  render() {
    return (
      <Animated.View {...this.PanResponder.panHandlers} style={this.props.gestureStyle}>
        <View>{this.props.children}</View>
      </Animated.View>
    )
  }
}

