import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged,
     passwordChanged,
     nameChanged, 
     lastnameChanged, 
     signupUser } from '../../actions';
import { CardSection, Button, Logo, Input } from '../common';
import { SignForm, styles } from '../common/SignForm';
import Spinner from 'react-native-spinkit';

class SignupForm extends Component {
    onEmailChangeText(text) {
        this.props.emailChanged(text);
    }   

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onNameChangeText(text) {
        this.props.nameChanged(text);
    }

    onLastNameChangeText(text) {
        this.props.lastnameChanged(text);
    }

    onButtonPress() {
        const { email, password, name, lastname } = this.props;

        this.props.signupUser({ email, password, name, lastname });
    }

    logIn() {
        Actions.login();
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        if (this.props.loading) {
            return (
                <View style={styles.spinnerStyle}>
                    <Spinner color={'white'} size={37} type={'Circle'} />
                </View>
            );
        }

        return (
            <CardSection>
                <Button onPress={this.onButtonPress.bind(this)}>
                    Registrarse
                </Button>
            </CardSection>
        );
    } 

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#0277BD' }}>
                <View style={styles.logoContainer}>
                    <Logo title="Registrar nueva cuenta" />                  
                </View>

                <CardSection>
                    <Input 
                        label="nombres"
                        placeholder="nombres"
                        onChangeText={this.onNameChangeText.bind(this)}
                        value={this.props.name}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        label="apellidos"
                        placeholder="apellidos"
                        onChangeText={this.onLastNameChangeText.bind(this)}
                        value={this.props.lastname}
                    />
                </CardSection>
                
                <SignForm Email={this.onEmailChangeText.bind(this)} Password={this.onPasswordChange.bind(this)} />   

                {this.renderError()}
                {this.renderButton()} 
                <CardSection>
                    <View style={styles.signupTextCont}>
                        <Text style={styles.singupText}>¿Ya tienes una cuenta? </Text>
                        <TouchableOpacity onPress={this.logIn.bind(this)}><Text style={styles.singupButton}>Iniciar sesión</Text></TouchableOpacity>
                    </View>
                </CardSection>
            </View>
        );
    }
}

const mapStateTpProps = ({ sinup }) => {
    const { email, password, name, lastname, error, loading } = sinup;
    
    return { email, password, name, lastname, error, loading };
};

export default connect(mapStateTpProps, {
    emailChanged,
    passwordChanged,
    nameChanged,
    lastnameChanged,
    signupUser
})(SignupForm);
