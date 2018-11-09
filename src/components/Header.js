import React from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Header = ({ message, onDownPress, onQueuePress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onDownPress}>
      <Image style={styles.button}
        source={require('../img/ic_keyboard_arrow_down_white.png')} />
    </TouchableOpacity>
    <Text>
      style={styles.message}>{message.toUpperCase()}</Text>
    <TouchableOpacity onPress={onQueuePress}>
      <Image style={styles.button}
        source={require('../img/ic_queue_music_white.png')} />
    </TouchableOpacity>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 65,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    backgroundColor: '#01579B',
  },
  message: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.72)',
    fontWeight: 'bold',
    fontSize: 15,
  },
  button: {
    opacity: 0.72
  }
});