import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-spinkit';
import AlbumSum from './AlbumSum';

class AlbumList extends Component {
  state = {
    albums: [],
    loading: true,
  };

  componentDidMount() {
    const { genre } = this.props; 
    console.log('title', this.props.title);

    axios.get(`https://albumapp-api.herokuapp.com/albums?genre=${genre}`)
      .then(response => this.setState({ albums: response.data, loading: false }));
  }

  renderAlbums() {
    return this.state.albums.map(album =>
       <AlbumSum key={album.title} albumData={album} />
    );
  }

  render() {
    console.log(this.props.genre);
    if (this.state.loading) {
      return (
        <View style={styles.viewStyle}>
          <Spinner color={'white'} size={37} type={'Circle'} />
        </View>
      );
    }

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#0277BD' }}>
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}

const styles = {
  viewStyle: {
    backgroundColor: '#0277BD',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

const mapStateToProps = ({ albums }) => {
  const { genre } = albums;

  return { genre };
};

export default connect(mapStateToProps, null)(AlbumList);
