import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button } from '../components/common';

class MyList extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#0277BD' }}>
                <CardSection>
                    <Text>Lista de álbumes</Text>
                </CardSection>
            </View>
        );
    }
}

export default MyList;
