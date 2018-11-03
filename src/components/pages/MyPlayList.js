import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, StyleSheet, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';
import { albumsFetch, setSearchField } from '../../actions';
import ListItemGrid from '../ListItemGrid';
import Fade from '../effectComponents/Fade';

const ITEM_WIDTH = Dimensions.get('window').width;

class MyPlayList extends Component {
    state = {
        columns: 2,
        data: [],
        filtered: false
    }

    componentWillMount() {
        this.props.albumsFetch();
    }

    filterAlbums = (text) => {
        const { albums } = this.props;
        const filteredAlbums = albums.filter(album => {
            return (album.title.toLowerCase().includes(text.toLowerCase()) ||
            album.artist.toLowerCase().includes(text.toLowerCase()));
        });
        this.setState({ data: filteredAlbums, filtered: true });
    };

    renderHeader = () => {
        return (<SearchBar
                placeholder='ingrese título de álbum...'
                containerStyle={{ backgroundColor: '#0277BD',
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent' }} 
                inputStyle={{ backgroundColor: 'white' }}
                onChangeText={this.filterAlbums}
        />);
    };

    render() {
        const { columns, data, filtered } = this.state;
        let albumData = null;
        if (this.props.loading) {
            return (
                <View style={styles.viewStyle}>
                    <Text style={{ color: 'white', marginTop: 5 }}>
                        Cargando...
                    </Text>
                </View>
            );
        }

        if (filtered) {
            albumData = data;
        } else {
            albumData = this.props.albums;
        }
       
        if (this.props.albums.length !== 0) {
            return (
                <View style={styles.container}>
                    <FlatList
                        numColumns={columns}
                        data={albumData}
                        renderItem={({ item }) => {
                            return <ListItemGrid itemWidth={(ITEM_WIDTH - (20 * columns)) / 2} album={item} />;
                        }}
                        keyExtractor={index => index.uid}
                        ListHeaderComponent={this.renderHeader}
                    />
                    <Fade />
                </View>);
        }
        
        return (
            <View style={styles.viewStyle}>
                <Text style={{ color: 'white', marginTop: 5 }}>
                    No existen álbumes en la playlist.
                </Text>
            </View>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0277BD'
    },
    viewStyle: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0277BD',
    }
});

const mapStateToProps = state => {
    const albums = _.map(state.albums.albums, (val, uid) => {
        return { ...val, uid }; //{ title: 'taylor', artis: 'swift'}
    });

    const { loading, searchField } = state.albums;

    return { albums, loading, searchField };
};

// when ever any piece of state upodates, the connect helper will rerun mapStateToProps
export default connect(mapStateToProps, { albumsFetch })(MyPlayList);
