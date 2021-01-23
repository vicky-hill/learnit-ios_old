import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';


const ReviewScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.word}>la varita</Text>
            <TextInput style={styles.input} />
        </View>
    )
}

export default ReviewScreen

const styles = StyleSheet.create({
    
    container: {
        alignItems: 'center',
        marginTop: '50%'
    },

    word: {
        marginVertical: 20,
        fontFamily: 'lato-black',
        fontSize: 24
    },

    input: {
        width: '80%',
        textAlign: 'center',
        paddingVertical: 20,
        paddingHorizontal: 40,
        fontFamily: 'lato-regular',
        fontSize: 18

    }
})
