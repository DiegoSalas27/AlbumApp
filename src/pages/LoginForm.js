import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { CardSection, Input, Button, Spinner, Logo } from '../components/common';

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
            return <Spinner size="large" />;
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
                
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChangeText.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="contraseña"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>    
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

const styles = {
    errorTextStyle: {
        fontSize: 20,
        color: 'red'
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 66,
        flexDirection: 'row'
    },
    singupText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16
    },
    singupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    }

};

const mapStateTpProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    
    return { email, password, error, loading };
};

export default connect(mapStateTpProps, {
    emailChanged, passwordChanged, loginUser
})(LoginForm);
