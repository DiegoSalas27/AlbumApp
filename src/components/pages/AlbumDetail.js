import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { albumDelete } from '../../actions';
import { Text, View, Image, ScrollView, Linking } from 'react-native';
import { CardSection, Button, Card, Confirm } from '../common';
import { Button2 } from '../common/Button2';
import { styles } from '../common/AlbumStyles';

class AlbumDetail extends Component {
    state = { showModal: false };

    onAccept() {
        const { title, uid } = this.props.Item;

        this.props.albumDelete({ title, uid });
        this.setState({ showModal: false });
    }

    onDecline() {
        this.setState({ showModal: false });
    }
    
    OnButtonPress() {
        Actions.songList({ album: this.props.Item });
    }

    // OnButtonPress() {
    //     Actions.player({ tracks: this.props.Item.songs, album: this.props.Item.title });
    // }

    render() {
        const { title, artist, thumbnail_image, image, url } = this.props.Item;
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
                            <Button2 onPress={() => Linking.openURL(url)}>
                                Comprar
                            </Button2>
                        </CardSection>

                        <CardSection>
                            <Image style={imageStyle} source={{ uri: image }} />
                        </CardSection>

                        <CardSection>
                            <Button onPress={this.OnButtonPress.bind(this)}>
                                Ver álbum
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

export default connect(null, { albumDelete })(AlbumDetail);

