import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, Image, View, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import Fade from './effectComponents/Fade';

export default class ListGenreGrid extends Component {
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
        }).start(() => Actions.albumList({ genre: this.props.genre }));
    }
    
    render() {
        const { itemWidth, genre } = this.props;

        console.log('prop', genre);
        const str = genre.replace(/\s/g, '');
        console.log(str);
        
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
                    <Fade>
                        <FadeIn>
                            <Image style={imgStyle(itemWidth).imgStyles} source={require(`../img/Country.jpg`)} />
                        </FadeIn>
                        <View>
                            <Text style={{ color: 'white', marginTop: 5 }}>{genre}</Text>
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
