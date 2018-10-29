import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    const { containerStyle } = styles;

    return (
        <View style={containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
  containerStyle: {
      padding: 10,
      flexDirection: 'row',
      position: 'relative'
  }
};

export { CardSection };

