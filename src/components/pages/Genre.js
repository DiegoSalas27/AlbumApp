import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Genre extends Component {
    state = {
        columns: 2,
        data: [],
        filtered: false
    }
    
    render() {
        return (
            <View>
                <Text>Genre page</Text>
            </View>
        );
    }
   
}

export default Genre;
