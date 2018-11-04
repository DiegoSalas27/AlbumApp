import React from 'react';
import { TextInput, View } from 'react-native';

const Input = ({ 
    value,
    onChangeText, 
    placeholder, 
    secureTextEntry, 
    keyboardType,
    autoCapitalize }) => {
    const { containerInput, inputBox } = styles;
    return (
        <View style={containerInput}>
            <TextInput 
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor="#ffffff"
                autoCorrect={false} //we disable the autocorrect from ios or android
                style={inputBox}
                value={value}
                onChangeText={onChangeText}
                underlineColorAndroid='rgba(0,0,0,0)'
                selectionColor="#fff"
            />
        </View>
    );
};

const styles = {
    containerInput: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputBox: {
        width: 300,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        color: '#ffffff'
    }
};
export { Input };
