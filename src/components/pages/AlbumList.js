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
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      loading: true,
      limit: 2,
      albumsT: [],
    };
  }
 
  async componentDidMount() {
    const { limit } = this.state;
    const { genre } = this.props; 
    console.log('title', this.props.title);

    axios.get(`https://albumapp-api.herokuapp.com/albums?genre=${genre}&offset=0&limit=${limit}`)
      .then(response => this.setState({ albums: response.data, loading: false }));
    
    axios.get(`https://albumapp-api.herokuapp.com/albums?genre=${genre}`)
      .then(response => this.setState({ albumsT: response.data }));  
  }

  renderAlbums() {
    return this.state.albums.map(album =>
       <AlbumSum key={album.title} albumData={album} />
    );
  }

  renderMore() {
    const { limit } = this.state;
    const { genre } = this.props; 
    
    console.log(this.state.albums);
  
    axios.get(`https://albumapp-api.herokuapp.com/albums?genre=${genre}&offset=0&limit=${limit+2}`)
      .then(response => { this.setState({ albums: response.data, loading: false }); });

    this.setState({ limit: limit + 2, loading: true }); //this resets the component, but won't unmount it
  }

  renderButton() {
    const { albums, albumsT } = this.state;

    if (albums.length !== albumsT.length) {
      return (
        <Fade fadeIt={2000}>
          <CardSection>
              <Button onPress={this.renderMore.bind(this)}>
                Cargar más
              </Button>
          </CardSection>
        </Fade>);
    }
  }

  render() {
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
  const { genre } = albums;

  return { genre };
};

export default connect(mapStateToProps, null)(AlbumList);
