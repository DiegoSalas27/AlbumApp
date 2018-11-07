import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, Image, View, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { connect } from 'react-redux';
import { genreChanged } from '../actions';
import Fade from './effectComponents/Fade';

const thumbnails = {
    'Country': require('../img/Country.jpg'),
    'Rock': require('../img/Rock.jpg'),
    'Rap&HipHop': require('../img/Rap&HipHop.jpg')
};

class ListGenreGrid extends Component {
    state = {
        animatePress: new Animated.Value(1)
    }

    animateIn() {
        this.props.genreChanged(this.props.genre); 
        Animated.timing(this.state.animatePress, {
            toValue: 0.9,
            duration: 200
        }).start();
    }

    animateOut() {
        Animated.timing(this.state.animatePress, {
            toValue: 1,
            duration: 200
        }).start(() => Actions.albumList());
    }
    
    render() {
        const { itemWidth, genre } = this.props;

        console.log(genre);

        const image = genre.replace(/\s/g, '');
        const thumbnail = thumbnails[image];
        
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
                            <Image style={imgStyle(itemWidth).imgStyles} source={thumbnail} />
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

export default connect(null, { genreChanged })(ListGenreGrid);
