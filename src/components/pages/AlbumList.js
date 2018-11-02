import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import AlbumSum from './AlbumSum';

class AlbumList extends Component {
  state = {
    albums: []
  };

  componentDidMount() {
    axios.get('https://albumapp-api.herokuapp.com/albums')
      .then(response => this.setState({ albums: response.data }));
  }

  renderAlbums() {
    return this.state.albums.map(album =>
       <AlbumSum key={album.title} albumData={album} />
    );
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#0277BD' }}>
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}

export default AlbumList;
