import firebase from 'firebase';
import axios from 'axios';

export default class Helpers {

    //For users

    static setUserName(uid, name) {
        const userNamePath = `/users/${uid}/profile/name`;
        return firebase.database().ref(userNamePath).set(name);
    }
    static setUserLastname(uid, lastname) {
        const userNamePath = `/users/${uid}/profile/lastname`;
        return firebase.database().ref(userNamePath).set(lastname);
    }
    static setUserEmail(uid, email) {
        const userNamePath = `/users/${uid}/profile/email`;
        return firebase.database().ref(userNamePath).set(email);
    }
    static setUserBio(uid, bio) {
        const userNamePath = `/users/${uid}/profile/bio`;
        return firebase.database().ref(userNamePath).set(bio);
    }
    static setImageUrl(uid, url) {
        const userNamePath = `/users/${uid}/profile/url`;
        return firebase.database().ref(userNamePath).set(url);
    }

    static setAccountType(uid, accounttype) {
        const userNamePath = `/users/${uid}/profile/accounttype`;
        return firebase.database().ref(userNamePath).set(accounttype);
    }

    static getImageUrl(uid, callback) {
        const userNamePath = `/users/${uid}/profile/url`;
        firebase.database().ref(userNamePath).on('value', (snapshot) => {
            let imageUrl = '';
            if (snapshot.val()) {
                imageUrl = snapshot.val();
            }
            callback(imageUrl);
        });
    }
    static getUserName(uid, callback) {
        const userNamePath = `/users/${uid}/profile/name`;
        firebase.database().ref(userNamePath).on('value', (snapshot) => {
            let name = '';
            if (snapshot.val()) {
                name = snapshot.val();
            }
            callback(name);
        });
    }
    static getUserLastname(uid, callback) {
        const userNamePath = `/users/${uid}/profile/lastname`;
        firebase.database().ref(userNamePath).on('value', (snapshot) => {
            let lastname = '';
            if (snapshot.val()) {
                lastname = snapshot.val();
            }
            callback(lastname);
        });
    }
    static getUserEmail(uid, callback) {
        const userNamePath = `/users/${uid}/profile/email`;
        firebase.database().ref(userNamePath).on('value', (snapshot) => {
            let email = '';
            if (snapshot.val()) {
                email = snapshot.val();
            }
            callback(email);
        });
    }
    static getUserBio(uid, callback) {
        const userNamePath = `/users/${uid}/profile/bio`;
        firebase.database().ref(userNamePath).on('value', (snapshot) => {
            let bio = '';
            if (snapshot.val()) {
                bio = snapshot.val();
            }
            callback(bio);
        });
    }

    static getAccoutType(uid, callback) {
        const userNamePath = `/users/${uid}/profile/accounttype`;
        firebase.database().ref(userNamePath).on('value', (snapshot) => {
            let accountType = '';
            if (snapshot.val()) {
                accountType = snapshot.val();
            }
            callback(accountType);
        });
    }

    //For Album Api post and put

    static updateAlbumLikes(_id, likes) {
        axios.put(`https://albumapp-api.herokuapp.com/albums/${_id}`, {
            likes: likes + 1
        }).then(function (response) {
            console.log(response);
        })
          .catch(function (error) {
            console.log(error);
        });  
    }
}
