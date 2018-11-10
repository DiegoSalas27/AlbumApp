import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Image, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';

const ITEM_WIDTH = Dimensions.get('window').width;

class SongList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            fSongs: [],
            songs: [],
        };
    }

    filterSongs = (text) => {
        const { fSongs } = this.state;
        const filteredSongs = fSongs.filter(song => {
            return (song.toLowerCase().includes(text.toLowerCase()));
        });
        this.setState({ songs: filteredSongs });
    };

    playAlbum(index) {
        Actions.player({ tracks: this.props.album.songs, album: this.props.album.title, start: index });
    }

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View 
            style={{ 
                paddingVertical: 20 }}
            >
                <ActivityIndicator containerStyle={{ color: 'white' }} animating size="large" />
            </View>
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{ 
                    height: 1, 
                    width: '86%', 
                    backgroundColor: '#CED0CE', 
                    marginLeft: '14%' }}
            />
        );
    };

    renderAvatar(item) {
        return (<Image 
            style={{ width: 70, height: 70, borderRadius: 150 / 2 }}
            source={{ uri: item.albumArtUrl }}
        />
        );
    }

    render() {
        return (
            <View style={{ backgroundColor: '#0277BD', flex: 1 }}>
                <SearchBar
                    placeholder='ingrese título de la canción...'
                    containerStyle={styles.searchBarStyle} 
                    inputStyle={{ backgroundColor: 'white' }}
                    onChangeText={this.filterSongs}
                />
                <List 
                containerStyle={{ 
                    borderTopWidth: 0, 
                    borderBottomWidth: 0, 
                    backgroundColor: '#0277BD' }}
                >
                    <FlatList
                        data={this.props.album.songs}
                        renderItem={({ item, index }) => (
                            <ListItem
                                titleStyle={{ color: 'white' }}
                                title={item.artist}
                                subtitle={item.title}
                                avatar={this.renderAvatar(item)}
                                containerStyle={{ borderBottomWidth: 0 }}
                                onPress={() => this.playAlbum(index)}
                                underlayColor='#5F42B1'
                            />
                        )}
                        keyExtractor={(item) => item.title}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListFooterComponent={this.renderFooter}
                    />
                </List>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchBarStyle: {
        backgroundColor: '#0277BD',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        width: ITEM_WIDTH
    }
});

export default SongList;
