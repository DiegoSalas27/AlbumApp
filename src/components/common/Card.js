import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
    const { containerStyle } = styles;
    
    return (
        <View style={containerStyle}> 
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0, //so the image fits nicely in the card item
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 }, // specifies what side we want the shadow to be on
        shadowOpacity: 0.1,
        shadowRadius: 2, 
        elevation: 4,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#E1F5FE'
    }
};
export { Card };
