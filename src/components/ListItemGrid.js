import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, Image, View, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import Fade from './effectComponents/Fade';

export default class ListItemGrid extends Component {
    state = {
        animatePress: new Animated.Value(1)
    }

    animateIn() {
        Animated.timing(this.state.animatePress, {
            toValue: 0.9,
            duration: 200
        }).start();
    }

    animateOut() {
        Animated.timing(this.state.animatePress, {
            toValue: 1,
            duration: 200
        }).start(() => Actions.albumDetail({ Item: this.props.album }));
    }

    render() {
        const { itemWidth } = this.props;
        const { title, image } = this.props.album;
        console.log(this.props);

        return (
            <TouchableWithoutFeedback
                onPressIn={() => this.animateIn()}
                onPressOut={() => this.animateOut()}
            >
                <Animated.View style={{ 
                    margin: 10,
                    transform: [{ scale: this.state.animatePress }],
                    }}
                >   
                    <Fade fadeIt={1000}>
                        <FadeIn>
                            <Image style={imgStyle(itemWidth).imgStyles} source={{ uri: image }} />
                        </FadeIn>
                        <View>
                            <Text style={{ color: 'white', marginTop: 5 }}>{title}</Text>
                        </View>
                    </Fade>
                    
                </Animated.View>
                
            </TouchableWithoutFeedback>
        );
    }
}

const imgStyle = (props) => StyleSheet.create({
    imgStyles: {
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0, //so the image fits nicely in the card item
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 }, // specifies what side we want the shadow to be on
        shadowOpacity: 1,
        shadowRadius: 2, 
        elevation: 8,
        width: props,
        height: 120 
    }
});
