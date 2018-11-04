import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../../actions';
import { CardSection, Button, Logo } from '../common';
import { SignForm, styles } from '../common/SignForm';
import Spinner from 'react-native-spinkit';

class LoginForm extends Component {
    onEmailChangeText(text) {
        this.props.emailChanged(text);
    }   

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;
        
        this.props.loginUser({ email, password });
    }

    signUp() {
        Actions.signup();
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
                    Iniciar Sesión
                </Button>
            </CardSection>
        );
    } 

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#0277BD' }}>
                <View style={styles.logoContainer}>
                    <Logo title="Album App" />
                </View>
                
                <SignForm Email={this.onEmailChangeText.bind(this)} Password={this.onPasswordChange.bind(this)} />  

                {this.renderError()}
                {this.renderButton()} 
                <CardSection>
                    <View style={styles.signupTextCont}>
                        <Text style={styles.singupText}>¿No tienes una cuenta todavía? </Text>
                        <TouchableOpacity onPress={this.signUp.bind(this)}><Text style={styles.singupButton}>Regístrate</Text></TouchableOpacity>
                    </View>
                </CardSection>
            </View>
        );
    }
}

const mapStateTpProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    
    return { email, password, error, loading };
};

export default connect(mapStateTpProps, {
    emailChanged, passwordChanged, loginUser
})(LoginForm);
