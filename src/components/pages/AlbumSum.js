import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Text, View, Image } from 'react-native';
import { albumAdd, albumsFetch } from '../../actions';
import { CardSection, Button, Card } from '../common';
import { styles } from '../common/AlbumStyles'; 
import Helpers from '../../lib/helpers';

class AlbumSum extends Component {
    
    componentDidMount() {
        this.props.albumsFetch();
    }

    OnButtonPress() {
        const { title, artist, thumbnail_image, image, url, songs, _id, likes } = this.props.albumData;  
        
        this.props.albumAdd({ title, artist, thumbnail_image, image, url, songs });
        console.log(this.props.albumData);

        Helpers.updateAlbumLikes(_id, likes);
    }

    renderButton() {    
        if (this.props.albums.filter(data => data.title === this.props.albumData.title).length !== 0) {
            return (
                <View style={ownStyles.textStyle}>
                    <Text style={{ color: 'black', margin: 5 }}>Álbum agregado</Text>
                </View>
            );
        }

        return (
            <CardSection>
                <Button onPress={this.OnButtonPress.bind(this)}>
                    Agregar a la playlist
                </Button>
            </CardSection>
        );
    }

    render() {
        const { title, artist, thumbnail_image, image } = this.props.albumData;
        const { headerContentStyle, thumbnailStyle, thumbnailContainerStyle,
            headerTextStyle, imageStyle } = styles;
        
        if (this.props.loading) {
            return <View />;
        }

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
                {this.renderButton()}  
            </Card>
        ); 
    }
}

const ownStyles = {
    viewStyle: {
        backgroundColor: '#0277BD',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    }
};

const mapStateToProps = state => {
    const albums = _.map(state.albums.albums, (val, uid) => {
        return { ...val, uid }; //{ title: 'taylor', artis: 'swift'}
    });

    const { loading } = state.albums;

    return { albums, loading };
};

// when ever any piece of state upodates, the connect helper will rerun mapStateToProps
export default connect(mapStateToProps, { albumAdd, albumsFetch })(AlbumSum);
