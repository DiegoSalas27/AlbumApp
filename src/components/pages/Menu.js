import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, List, ListItem, Thumbnail } from 'native-base';

class Menu extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: '#2c3e50', justifyContent: 'center', alignItems: 'center' }}>
                    <Thumbnail 
                        source={require('../../img/AlbumLogo.png')}
                        large
                    />

                    <Text style={{ color: 'white', fontSize: 15 }}>Dominic </Text>
                </View>
                <View style={{ flex: 2 }}>
                    <Content>
                        <List>
                            <ListItem onPress={() => Actions.albumList()}>
                                <Text>Los más escuchados</Text>
                            </ListItem>
                            <ListItem>
                                <Text>buscar por género</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.profile()}>
                                <Text>Perfil</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.auth()}>
                                <Text>Cerrar sesión</Text>
                            </ListItem>
                        </List>
                    </Content>
                </View>
            </View>
        );
    }
}

export default Menu;
