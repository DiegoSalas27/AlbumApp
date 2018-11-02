import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { albumAdd } from '../../actions';
import { CardSection, Button, Card } from '../common';
import { styles } from '../common/AlbumStyles';

class AlbumSum extends Component {

    OnButtonPress() {
        const { title, artist, thumbnail_image, image, url } = this.props.albumData;  
        
        this.props.albumAdd({ title, artist, thumbnail_image, image, url });
    }

    render() {
        const { title, artist, thumbnail_image, image } = this.props.albumData;
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
                    <Button onPress={this.OnButtonPress.bind(this)}>
                        Agregar a la playlist
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default connect(null, { albumAdd })(AlbumSum);
