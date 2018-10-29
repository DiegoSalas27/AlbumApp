import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CardSection, Input, Button, Card  } from '../components/common';

class MyPlayList extends Component {
    

    render() {
        const { container, textStyle } = styles;
        
        return (
            <View style={container}>
                <CardSection>
                    <Text style={textStyle}>Lista de álbumes</Text>
                </CardSection>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#0277BD', 
        alignItems: 'center', 
    },
    textStyle: {
        color: 'white'
    }
};

export default MyPlayList;
