import React from 'react';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';
import LoginForm from './components/pages/LoginForm';
import SignupForm from './components/pages/SignupForm';
import AlbumList from './components/pages/AlbumList';
import MyPlayList from './components/pages/MyPlayList';
import AlbumDetail from './components/pages/AlbumDetail';
import Player from './components/Player';

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={{ backgroundColor: '#01579B' }} titleStyle={{ color: 'white' }} headerTintColor='white' >
            <Stack key="root" hideNavBar>
                <Stack key="auth">
                    <Scene key="login" component={LoginForm} initial hideNavBar />
                    <Scene key="signup" component={SignupForm} hideNavBar />
                </Stack>
                <Stack key="main" headerLayoutPreset='center'>
                    <Scene 
                        onRight={() => Actions.myList()}
                        rightTitle="Playlist"
                        key="albumList"
                        component={AlbumList}
                        title="Los más escuchados"
                        initial
                    />
                    <Scene 
                        onLeft={() => Actions.main({ type: 'reset' })}
                        leftTitle="Más populares "
                        key="myList" 
                        component={MyPlayList} title="PlayList"
                    />
                    <Scene key="albumDetail" component={AlbumDetail} title="Detalle de álbum" />
                    <Scene key="player" component={Player} hideNavBar />
                </Stack>              
            </Stack>
        </Router>
    );
};

export default RouterComponent;

