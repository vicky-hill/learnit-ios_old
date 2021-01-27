import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const ConjugationScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Conjugation coming soon!</Text>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Vocabulary')}}>
                <Text style={styles.buttonText}>Go to Vocabulary</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 40,
        marginBottom: 170,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontFamily: 'lato-light',
        fontSize: 26,
        marginBottom: 30
    },

    button: {
        width: 200,
        backgroundColor: '#f3c74f',
        color: '#fff',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginTop: 25
    },

    buttonText: {
        color: '#fff',
        fontFamily: 'lato-black'
    },
});

export default ConjugationScreen;