import React from 'react';
import { Router, Stack, Scene, Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginForm from './components/pages/LoginForm';
import SignupForm from './components/pages/SignupForm';
import AlbumList from './components/pages/AlbumList';
import MyPlayList from './components/pages/MyPlayList';
import AlbumDetail from './components/pages/AlbumDetail';
import Player from './components/Player';
import Menu from './components/pages/Menu';
import Profile from './components/pages/Profile';
import Genre from './components/pages/Genre';
import SongList from './components/pages/SongList';
import UploadMusic from './components/pages/UploadMusic';
import RankingAlbum from './components/pages/RakingAlbum';

const MenuIcon = () => {
    return (
        <Icon name='menu' size={30} color='white' />
    );
};

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={{ backgroundColor: '#01579B' }} titleStyle={{ color: 'white' }} headerTintColor='white' >
            <Stack key="root" hideNavBar>
                <Stack key="auth">
                    <Scene key="login" component={LoginForm} initial hideNavBar type={ActionConst.REPLACE} />
                    <Scene key="signup" component={SignupForm} hideNavBar type={ActionConst.REPLACE} />
                </Stack>
                <Stack key="main" headerLayoutPreset='center' type={ActionConst.RESET}>
                    <Scene
                        key="drawer"
                        drawer
                        contentComponent={Menu}
                        drawerIcon={MenuIcon}
                        drawerWidth={300}
                        hideNavBar
                    >
                        <Scene 
                            onRight={() => Actions.myList()}
                            rightTitle="Playlist"
                            key="albumList"
                            component={AlbumList}
                            title="Los más escuchados"
                        />
                        <Scene 
                            onLeft={() => Actions.main({ type: 'pop' })}
                            leftTitle="Más populares"
                            key="myList" 
                            component={MyPlayList} 
                            title="PlayList"
                        />
                        <Scene 
                            key="genre" 
                            component={Genre}
                            title="Buscar por género"   
                        /> 
                        <Scene
                            key="uploadMusic"
                            component={UploadMusic}
                            title="Subir nuevo álbum"
                        />  
                        <Scene
                            key="rankingAlbum"
                            component={RankingAlbum}
                            title="Tú ranking de álbumes"
                        />     
                    </Scene>
                    <Scene key="albumDetail" component={AlbumDetail} title="Detalle de álbum" />
                    <Scene key="player" component={Player} hideNavBar />
                    <Scene key="profile" component={Profile} title="Perfil" />
                    <Scene key="songList" component={SongList} title="Lista de canciones" />
                </Stack>              
            </Stack>
        </Router>
    );
};

export default RouterComponent;

