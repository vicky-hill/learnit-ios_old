import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const WordListItem = (props) => {
    // From WordListScreen 
    const { word: { spanish, english }} = props
    

    return (
        <View style={styles.container}>
                <Text style={styles.word}>{spanish}</Text>
                <Text style={styles.translation}>{english}</Text>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 22,
        paddingVertical: 15,
        paddingBottom: 19,
        marginVertical: 6,
        marginHorizontal: 20,
        borderRadius: 6,
        alignItems: 'flex-start',
        justifyContent: 'center',

        shadowColor: "#1f2023",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2,
        elevation: 0
    },

    word: {
        marginBottom: 4,
        fontFamily: 'lato-bold',
        fontSize: 16,
        color: '#f3c74f'
    },

    translation: {
        fontSize: 14,
        color: 'slategray',
        fontFamily: 'lato-regular',
    }
})


export default WordListItem;