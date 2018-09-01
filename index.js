// Import a library to help create a component
import React from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList';

// Create a component
const App = () => ( //(flex) expand this component to fill the entire content area of the device
    <View style={{ flex: 1 }}>
      <Header headerText={'albums'} />
      <AlbumList />
    </View>
);

// Render it to the device
AppRegistry.registerComponent('albums', () => App);