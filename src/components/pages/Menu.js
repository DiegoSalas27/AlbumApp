import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import firebase from 'firebase';
import Helpers from '../../lib/helpers';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            avatarUrl: '',
            userName: '',
            userLastname: '',
            userEmail: '',
            userBio: '',
            uid: ''
        };
    }
    

    async componentWillMount() {
        try {
          const user = await firebase.auth().currentUser;

          Helpers.getImageUrl(user.uid, (imageUrl) => {
            this.setState({ avatarUrl: imageUrl });
          });
          Helpers.getUserName(user.uid, (name) => {
            this.setState({ userName: name });
          });
          Helpers.getUserLastname(user.uid, (lastname) => {
            this.setState({ userLastname: lastname });
          });
          Helpers.getUserEmail(user.uid, (email) => {
            this.setState({ userEmail: email });
          });
          Helpers.getUserBio(user.uid, (bio) => {
            this.setState({ userBio: bio });
          });

          this.setState({ uid: user.uid });
        } catch (error) {
            console.log(error);
        }
    }  

    mostrarAvatar() {
        if (this.state.avatarUrl) {
            return (<Image 
            style={{ width: 100, height: 100, borderRadius: 150 / 2 }}
            source={{ uri: this.state.avatarUrl }}
            />);
        } 
        return (<Thumbnail 
                source={require('../../img/avatar.png')}
                large
        />); 
    }

    mostrarNombreUsuario() {
        if (this.state.userName !== '') {
            return <Text style={{ color: 'white', fontSize: 15 }}>{this.state.userName}</Text>;
        }
        return <Text style={{ color: 'white', fontSize: 15 }}>Usuario</Text>; 
    }

    render() {
        const { userName, userLastname, userEmail, userBio, avatarUrl } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: '#2c3e50', justifyContent: 'center', alignItems: 'center' }}>
                    {this.mostrarAvatar()}
                    {this.mostrarNombreUsuario()}
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
                            <ListItem onPress={() => Actions.profile({ 
                            name: userName, 
                            lastname: userLastname, 
                            email: userEmail, 
                            bio: userBio, 
                            avatar: avatarUrl })}
                            >
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
