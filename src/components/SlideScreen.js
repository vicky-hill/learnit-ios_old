import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';


const SlideScreen = ({ bounceValue, children }) => {

    return (
        <Animated.View style={[styles.slide, { transform: [{ translateY: bounceValue }] }]} >
            { children}
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    slide: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        backgroundColor: '#fff'
    }
})

const mapStateToProps = state => ({
    bounceValue: state.utils.slideScreen.bounceValue
})

export default connect(mapStateToProps, {})(SlideScreen)