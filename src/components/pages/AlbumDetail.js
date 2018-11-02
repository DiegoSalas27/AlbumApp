import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { albumDelete } from '../../actions';
import { Text, View, Image, ScrollView } from 'react-native';
import { CardSection, Button, Card, Confirm } from '../common';
import { styles } from '../common/AlbumStyles';

class AlbumSum extends Component {
    state = { showModal: false };

    onAccept() {
        const { uid } = this.props.Item;

        this.props.albumDelete({ uid });
        this.setState({ showModal: false });
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    OnButtonPress() {
        //  { title, artist, thumbnail_image, image, url } = this.props.albumData;  
        const TRACKS = [
              {
                artist: 'Taylor Swift',
                title: 'Picture to Born',
                albumArtUrl: 'https://images-na.ssl-images-amazon.com/images/I/61McsadO1OL.jpg',
                audioUrl: 'https://albumapp-api.herokuapp.com/Picture_To_Born.mp3'
              },
              {
                artist: 'Taylor Swift',
                title: 'Love Story',
                albumArtUrl: 'https://images-na.ssl-images-amazon.com/images/I/61McsadO1OL.jpg',
                audioUrl: 'https://albumapp-api.herokuapp.com/Love_Story.mp3'
              }
          ];

        Actions.player({ tracks: TRACKS });
    }

    render() {
        const { title, artist, thumbnail_image, image } = this.props.Item;
        const { headerContentStyle, thumbnailStyle, thumbnailContainerStyle,
            headerTextStyle, imageStyle } = styles;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#0277BD' }}>
                <View style={{ flex: 1, backgroundColor: '#0277BD' }}>
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
                            <Button onPress={this.OnButtonPress.bind(this)}>
                                Play
                            </Button>
                        </CardSection>

                        <CardSection>
                            <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                                Eliminar
                            </Button>
                        </CardSection>

                        <Confirm 
                            visible={this.state.showModal}
                            onAccept={this.onAccept.bind(this)}
                            onDecline={this.onDecline.bind(this)}
                        >
                            <Text style={{ color: 'white' }}>¿Estás seguro que deseas eliminar este álbum?</Text>
                        </Confirm>
                    </Card>
                </View>
            </ScrollView>
        );
    }
}

export default connect(null, { albumDelete })(AlbumSum);

