import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { FlatList,  View, Text } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import _ from 'lodash';
import { albumsFetch } from '../../actions';

class MyPlayList extends Component {

    componentWillMount() {
        this.props.albumsFetch();
    }

    renderItem({ item }) {
        return (
            <ListItem
                roundAvatar
                item={item}
                avatar={item.thumbnail_image}
                title={`Álbum: ${item.title}`}
                subtitle={`Artista: ${item.artist}`}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={() => { Actions.albumDetail({ Item: item }); }}
            />
        );
    }

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
    }

    renderHeader = () => {
        return <SearchBar placeholder='ingrese título de álbum...' lightTheme round />;
    };

    render() {
        console.log(this.props.albums);
        if (this.props.albums.length !== 0) {
            return (
                <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: -2 }}>
                <FlatList
                    data={this.props.albums}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
                </List>
            );
        }
        return (
            <View style={{ position: 'relative', flex: 1, alignItems: 'center' }}>
                <Text>
                    No existen álbumes en la playlist.
                </Text>
            </View>
        ); 
    }
}

const mapStateToProps = state => {
    const albums = _.map(state.albums, (val, uid) => {
        return { ...val, uid }; //{ title: 'taylor', artis: 'swift'}
    });

    return { albums };
};

// when ever any piece of state upodates, the connect helper will rerun mapStateToProps
export default connect(mapStateToProps, { albumsFetch })(MyPlayList);
