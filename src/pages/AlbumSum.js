import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, Linking } from 'react-native';
import { albumAdd } from '../actions';
import { CardSection, Button, Card } from '../components/common';

const AlbumSum = ({ albumData }) => {
  const { title, artist, thumbnail_image, image, url } = albumData;  
  const { headerContentStyle, thumbnailStyle, thumbnailContainerStyle,
     headerTextStyle, imageStyle } = styles;

  return (
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
            <Image style={thumbnailStyle} source={{ uri: thumbnail_image }} />
        </View>
        <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{title}</Text>
            <Text>{artist} </Text>
        </View>
      </CardSection>

      <CardSection>
          <Image style={imageStyle} source={{ uri: image }} />
      </CardSection>

      <CardSection>
          <Button onPress={() => { console.log('agregado'); }}>
              Agregar a la playlist
          </Button>
      </CardSection>

      {/* <CardSection>
          <Button onPress={() => Linking.openURL(url)}>
              Buy now
          </Button>
      </CardSection> */}
    </Card>
  );
};

const styles = {
    headerContentStyle: {
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        marginTop: 10,
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1, //This will allow us for the image to take the whole width of the device
        width: null
    }
};

const mapStateToProps = ({ album }) => {
    const { title, artist, thumbnail_image, image, url } = album;
    
    return { title, artist, thumbnail_image, image, url };
};
export default connect(mapStateToProps, { albumAdd })(AlbumSum);
