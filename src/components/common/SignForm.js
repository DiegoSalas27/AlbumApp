import React, { Component } from 'react';
import { View } from 'react-native';
import { CardSection, Input } from '.';

export class SignForm extends Component {
    render() {
        return (
            <View>
                <CardSection>
                    <Input 
                        type='email-address'
                        label="Email"
                        placeholder="email@gmail.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={this.props.Email}
                        value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="contraseña"
                        onChangeText={this.props.Password}
                        value={this.props.password}
                    />
                </CardSection>    
            </View>
        );
    }
}

export const styles = {
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
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    }
};
