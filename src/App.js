import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk'; //it is a middleware
import reducers from './reducers';
import RouterComponent from './Router';

class App extends Component {

    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyDLP1FR1PbqwDh4dOBtEogRLPcqbk7ri9Y',
            authDomain: 'album-app-b6f7f.firebaseapp.com',
            databaseURL: 'https://album-app-b6f7f.firebaseio.com',
            projectId: 'album-app-b6f7f',
            storageBucket: 'album-app-b6f7f.appspot.com',
            messagingSenderId: '159689340427'
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor="#01355D"
                        barStyle="light-content"
                    />
                    <RouterComponent />
                </View>
            </Provider>
        );
    }
}

const styles = {
    container: {
        flexGrow: 1,
    },
};

export default App;
