import React from 'react';
import { StyleSheet, Text } from 'react-native';


const ErrorMessage = ({ message }) => {
    return (
        <Text style={styles.error}>{message}</Text>
    )
}

const styles = StyleSheet.create({
    
    error: {
        backgroundColor: '#f8e1e1',
        paddingVertical: 10,
        paddingHorizontal: 14,
        width: '100%',
        marginBottom: 10,
        marginTop: 5,
        borderRadius: 6,
        overflow: 'hidden',
        color: 'salmon',
        fontFamily: 'lato-bold',
        borderWidth: 1,
        borderColor: 'salmon'
    },

})

export default ErrorMessage;