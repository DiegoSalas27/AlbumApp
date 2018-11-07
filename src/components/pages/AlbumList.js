import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-spinkit';
import AlbumSum from './AlbumSum';
import { CardSection, Button } from '../common';
import Fade from '../effectComponents/Fade';

class AlbumList extends Component {
  state = {
    albums: [],
    loading: true,
    limit: 2
  };

  componentDidMount() {
    const { limit, offSet } = this.state;
    const { genre } = this.props; 
    console.log('title', this.props.title);

    axios.get(`https://albumapp-api.herokuapp.com/albums?genre=${genre}&offset=0&limit=${limit}`)
      .then(response => this.setState({ albums: response.data, loading: false }));
  }

  renderAlbums() {
    return this.state.albums.map(album =>
       <AlbumSum key={album.title} albumData={album} />
    );
  }

  renderMore() {
    const { limit } = this.state;
    const { genre } = this.props; 
    
    console.log(limit);
  
    axios.get(`https://albumapp-api.herokuapp.com/albums?genre=${genre}&offset=0&limit=${limit+2}`)
      .then(response => this.setState({ albums: response.data, loading: false }));

    this.setState({ limit: limit + 2, loading: true }); //this resets the component, but won't unmount it
  }

  renderButton() {
    console.log(this.props.loadBtn);
    if (this.props.loadBtn) {
      return (
        <Fade fadeIt={5000}>
          <CardSection>
              <Button onPress={this.renderMore.bind(this)}>
                Cargar más
              </Button>
          </CardSection>
        </Fade>);
    }
  }

  render() {
    console.log(this.props.genre);
    console.log(this.state.albums);
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
        {this.renderButton()}
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
  const { genre, loadBtn } = albums;

  return { genre, loadBtn };
};

export default connect(mapStateToProps, null)(AlbumList);
