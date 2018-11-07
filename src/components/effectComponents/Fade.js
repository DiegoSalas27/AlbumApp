import React from 'react';
import { Animated, View } from 'react-native';

export default class Fade extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    console.log(this.props.fadeIt);
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: this.props.fadeIt,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    const { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,        // Bind opacity to animated value
          alignItems: 'center'        
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
