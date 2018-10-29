import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle, containerInput } = styles;

  return (
    <View style={containerInput}>
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = {
    containerInput: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        alignSelf: 'center',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 16,
    },
    buttonStyle: {
        width: 300,
        height: 40,
        backgroundColor: '#2D09A1',
        borderRadius: 25,
        paddingHorizontal: 16,
        color: '#ffffff',
        
    }
};
export { Button };
