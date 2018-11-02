import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, signupUser } from '../../actions';
import { CardSection, Button, Spinner, Logo } from '../common';
import { SignForm, styles } from '../common/SignForm';

class SignupForm extends Component {
    onEmailChangeText(text) {
        this.props.emailChanged(text);
    }   

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.signupUser({ email, password });
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
            return <Spinner size="large" />;
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
    const { email, password, error, loading } = sinup;
    
    return { email, password, error, loading };
};

export default connect(mapStateTpProps, {
    emailChanged, passwordChanged, signupUser
})(SignupForm);
