import React, { Component } from 'react';
import _ from 'lodash';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Image, 
    TextInput,
    Platform,
    ToastAndroid, 
    Dimensions,
    ScrollView,
    Thumbnail
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import Helpers from '../../lib/helpers';
import Avatar from '../../img/avatar.png';

const ITEM_WIDTH = Dimensions.get('window').width;

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, imageName, mime = 'image/jpg') => {
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        let uploadBlob = null;
        const imageRef = firebase.storage().ref('images').child(imageName);
        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then((blob) => {
                uploadBlob = blob;
                return imageRef.put(blob, { contentType: mime });
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                resolve(url);
            })
            .catch((error) => {
                reject(error);
            });
    });
};


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePath: '',
            name: this.props.avatar !== 'profile' ? this.props.name : '',
            lastname: this.props.avatar !== 'profile' ? this.props.lastname : '',
            email: this.props.avatar !== 'profile' ? this.props.email : '',
            bio: this.props.avatar !== 'profile' ? this.props.bio : '', 
            uid: ''    
        };
    }

    async componentWillMount() {
        try {
            const { currentUser } = await firebase.auth();
            this.setState({
                uid: currentUser.uid
            });
        } catch (error) {
            console.log(error);
        }
    }

    openImagePicker() {
        const options = {
            title: 'Seleccione avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User canceled image Picker');
            } else if (response.error) {
                console.log('Error' + response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button' + response.customButton);
            } else {
                this.setState({ 
                    imagePath: response.uri,
                    imageHeight: response.height,
                    imageWidth: response.width
                });
            }
        });
    }

    saveForm() {
        const { name, lastname, email, bio, uid, imagePath } = this.state;
        if (uid) {
            try {
                name ? Helpers.setUserName(uid, name) : null;
                bio ? Helpers.setUserBio(uid, bio) : null;
                email ? Helpers.setUserEmail(uid, email) : null;
                lastname ? Helpers.setUserLastname(uid, lastname) : null;
                imagePath ? 
                    uploadImage(imagePath, `${uid}.jpg`)
                    .then((responseData) => {
                        Helpers.setImageUrl(uid, responseData);
                    })
                    .done()
                : null;

                toastMessage('¡Tu datos han sido actualizados!');
            } catch (error) {
                console.log(error);
            }
        }  
    }

    renderAvatar() {
        if (this.props.avatar !== 'profile') {
            return (<Image 
            style={{ width: 100, height: 100, borderRadius: 150 / 2 }}
            source={{ uri: this.props.avatar }}
            />);
        } 
        return (<Image 
            style={{ width: 100, height: 100, borderRadius: 150 / 2 }}
            source={Avatar}
        />); 
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity
                    onPress={this.openImagePicker.bind(this)}
                    style={{ marginBottom: 40, marginTop: 20 }}
                >
                    <View style={{ alignItems: 'center' }}>
                        {this.renderAvatar()}
                        <Text style={{ color: 'white' }}>Avatar </Text>
                    </View>
                </TouchableOpacity>
                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    selectionColor="#fff"
                    placeholderTextColor="#ffffff"
                    autoCorrect={false} //we disable the autocorrect from ios or android
                    style={styles.textInput}
                    placeholder='nombres'
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    selectionColor="#fff"
                    placeholderTextColor="#ffffff"
                    autoCorrect={false} //we disable the autocorrect from ios or android
                    style={styles.textInput}
                    placeholder='apellidos'
                    value={this.state.lastname}
                    onChangeText={(lastname) => this.setState({ lastname })}
                />
                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    selectionColor="#fff"
                    placeholderTextColor="#ffffff"
                    autoCorrect={false} //we disable the autocorrect from ios or android
                    style={styles.textInput}
                    type='email-address'
                    placeholder='email@gmail.com'
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    
                />
                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    selectionColor="#fff"
                    placeholderTextColor="#ffffff"
                    autoCorrect={false} //we disable the autocorrect from ios or android
                    style={styles.textArea}
                    placeholder='Ingresa algo sobre tí'
                    value={this.state.bio}
                    onChangeText={(bio) => this.setState({ bio })}
                />

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.saveForm.bind(this)}
                >
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0277BD',
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#cecece',
        marginBottom: 20,
        borderRadius: 20,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: '#ffffff',
        width: ITEM_WIDTH - 20,
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingVertical: 10,
        width: 150,
        backgroundColor: '#2D09A1',
        marginHorizontal: 20,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    textArea: {
        height: 150,
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#cecece',
        marginBottom: 20,
        borderRadius: 20,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: '#ffffff',
        width: ITEM_WIDTH - 20,
    }
});

const toastMessage = (texto) => {
    ToastAndroid.showWithGravity(
        texto,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
    );
};

export default Profile;
