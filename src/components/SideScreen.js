import React from 'react';
import { StyleSheet, Animated, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { toggleSide } from '../actions/utils';


const SideScreen = ({ bounceValue, children, toggleSide }) => {

    return (
        <Animated.View style={[styles.side, { transform: [{ translateX: bounceValue }] }]} >
            <View style={styles.children}>
                { children}
            </View>
       
            <TouchableOpacity style={styles.overlay} onPress={toggleSide}>

            </TouchableOpacity>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    side: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        flexDirection: 'row',

        shadowColor: "#1f2023",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2,
        elevation: 0
    },

    children: {
        width: '65%',
        backgroundColor: '#fff'
    },

    overlay: {
        backgroundColor: '#2e2c2c1a',
        backgroundColor: 'transparent',
        width: '30%',
        height: '100%'
    }
})

const mapStateToProps = state => ({
    bounceValue: state.utils.sideScreen.bounceValue
})

export default connect(mapStateToProps, { toggleSide })(SideScreen)