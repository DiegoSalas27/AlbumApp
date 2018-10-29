import React from 'react';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import AlbumList from './pages/AlbumList';
import MyPlayList from './pages/MyPlayList';

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={{ backgroundColor: '#01579B' }} titleStyle={{ color: 'white' }} headerTintColor='white' >
            <Stack key="root" hideNavBar>
                <Stack key="main" headerLayoutPreset='center'>
                    <Scene 
                        onRight={() => Actions.myList()}
                        rightTitle="Mi Lista"
                        key="albumList"
                        component={AlbumList}
                        title="Los más escuchados"
                        initial
                    />
                    <Scene key="myList" component={MyPlayList} title="Mi playlist" />
                </Stack>
                <Stack key="auth">
                    <Scene key="login" component={LoginForm} initial hideNavBar />
                    <Scene key="signup" component={SignupForm} hideNavBar />
                </Stack>
                
            </Stack>
        </Router>
    );
};

export default RouterComponent;

