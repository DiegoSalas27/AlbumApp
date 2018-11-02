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
            .then(() => ToastAndroid.showWithGravity(
                `¡Has agregado ${title} a la playlist!`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            ));
        };
    }

    return () => {
        ToastAndroid.showWithGravity(
            '¡Álbum ya existe en la playlist!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
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

export const albumDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/albums/${uid}`)
        .remove()
        .then(() => {
            Actions.myList({ type: 'reset' });
        });
    };
};

const validarPost = (currentUser, title) => {
    // let condition = true;
    let result = [];
    firebase.database().ref(`/users/${currentUser.uid}/albums`)
        .on('value', snapshot => { 
            result = _.map(snapshot.val()).filter(word => word.title === title);
            // for (let i = 0; i < _.map(snapshot.val()).length; i++) {
            //     if (_.map(snapshot.val())[i].title === title) {
            //         condition = false;      
            //         console.log('validando:', condition);     
            //     }
            // }
        });
        
    return result;  
};

