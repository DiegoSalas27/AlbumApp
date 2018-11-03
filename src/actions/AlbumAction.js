import { ToastAndroid } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import {
    ALBUM_FETCH_SUCCESS
} from './types';


export const albumAdd = ({ title, artist, thumbnail_image, image, url, songs }) => {
    const { currentUser } = firebase.auth();

    if (validarPost(currentUser, title).length === 0) {
        return () => {
            console.log('push', 'pusheando');     
            firebase.database().ref(`/users/${currentUser.uid}/albums`)
            .push({ title, artist, thumbnail_image, image, url, songs })
            .then(() => toastMessage(`¡Has agregado ${title} a la playlist!`));
        };
    }

    return () => {
        toastMessage('¡Álbum ya existe en la playlist!');
    };
};

export const albumsFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/albums`)
        .on('value', snapshot => { //snapshot is an object that describes de data to handle our albums and has access to it
            dispatch({ type: ALBUM_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const albumDelete = ({ title, uid }) => {
    const { currentUser } = firebase.auth();

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/albums/${uid}`)
        .remove()
        .then(() => {
            toastMessage(`Se ha eliminado ${title} de la playlist.`);
            Actions.myList({ type: 'reset' });
        });
    };
};

const validarPost = (currentUser, title) => {
    let result = [];
    firebase.database().ref(`/users/${currentUser.uid}/albums`)
        .on('value', snapshot => { 
            result = _.map(snapshot.val()).filter(word => word.title === title);
        });
        
    return result;  
};

const toastMessage = (texto) => {
    ToastAndroid.showWithGravity(
        texto,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
    );
};
