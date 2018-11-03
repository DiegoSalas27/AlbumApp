import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { FlatList, View, Text, StyleSheet, Dimensions } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import _ from 'lodash';
import { albumsFetch } from '../../actions';
import ListItemGrid from '../ListItemGrid';
import Fade from '../effectComponents/Fade';

const ITEM_WIDTH = Dimensions.get('window').width;

class MyPlayList extends Component {
    state = {
        grid: false,
        columns: 2
    }
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
        return <SearchBar
                placeholder='ingrese título de álbum...'
                containerStyle={{ backgroundColor: '#0277BD', borderBottomColor: 'transparent', borderTopColor: 'transparent' }} 
                inputStyle={{ backgroundColor: 'white' }}
               />;
    };

    render() {
        console.log('grilla:', this.props.grid);
        console.log(this.props.loading);
        console.log(this.props.albums);
        const { columns } = this.state;
        if (this.props.loading) {
            return (
                <View style={styles.viewStyle}>
                    <Text style={{ color: 'white', marginTop: 5 }}>
                        Cargando...
                    </Text>
                </View>
            );
        }
        if (this.props.albums.length !== 0) {
            return (
                <View style={styles.container}>
                    <FlatList
                        numColumns={columns}
                        data={this.props.albums}
                        renderItem={({ item }) => {
                            return <ListItemGrid itemWidth={(ITEM_WIDTH - (20 * columns)) / 2} album={item} />;
                        }}
                        keyExtractor={index => index.uid}
                        ListHeaderComponent={this.renderHeader}
                    />
                    <Fade />
                </View>);
            // return (
            //     <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: -2 }}>
            //     <FlatList
            //         data={this.props.albums}
            //         renderItem={this.renderItem}
            //         keyExtractor={(item, index) => index.toString()}
            //         ItemSeparatorComponent={this.renderSeparator}
            //         ListHeaderComponent={this.renderHeader}
            //     />
            //     </List>
            // );
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

    const { loading } = state.albums;

    return { albums, loading };
};

// when ever any piece of state upodates, the connect helper will rerun mapStateToProps
export default connect(mapStateToProps, { albumsFetch })(MyPlayList);
