import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import firebase from 'firebase';
import { genreAll } from '../../actions';
import Helpers from '../../lib/helpers';
import WelcomeDialog from './welcomeDialog';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            avatarUrl: '',
            title: '',
            userName: '',
            userLastname: '',
            userEmail: '',
            userBio: '',
            uid: '',
            accounttype: this.props.account
        };
    }
    

    async componentDidMount() {
        console.log('menu Mounted!');
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
            Helpers.getAccoutType(user.uid, (accountType) => {
            this.setState({ accounttype: accountType });
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

    displayAllGenres() {
        this.props.genreAll();    
        Actions.albumList();
    }

    renderUploadMusic() {
        if (this.state.accounttype === 'banda') {
            return (<ListItem onPress={() => Actions.uploadMusic()}>
                        <Text>Subir álbum</Text>
            </ListItem>);
        }
    }

    renderRankingAlbum() {
        if (this.state.accounttype === 'banda') {
            return (<ListItem onPress={() => Actions.rankingAlbum()}>
                        <Text>Tú ranking de álbumes</Text>
            </ListItem>);
        }
    }

    renderWelcomeDialog() {
        if (this.state.accounttype === '') {
          return <WelcomeDialog />;
        }
    }

    render() {
        const { userName, userLastname, userEmail, userBio, avatarUrl } = this.state;
        console.log(this.state.accounttype);
        return (
            <View style={{ flex: 1 }}>
                {this.renderWelcomeDialog()}
                <View style={{ flex: 1, backgroundColor: '#2c3e50', justifyContent: 'center', alignItems: 'center' }}>
                    {this.mostrarAvatar()}
                    {this.mostrarNombreUsuario()}
                </View>
                <View style={{ flex: 2 }}>
                    <Content>
                        <List>
                            <ListItem onPress={this.displayAllGenres.bind(this)}>
                                <Text>Los más escuchados</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.genre()}>
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
                            {this.renderUploadMusic()}
                            {this.renderRankingAlbum()}
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

const mapStateToProps = ({ albums }) => {
    const { genre, account } = albums;
  
    return { genre, account };
  };

export default connect(mapStateToProps, { genreAll })(Menu);
