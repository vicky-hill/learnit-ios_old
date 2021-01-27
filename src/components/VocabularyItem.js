import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';


const VocabularyItem = (props) => {
    // VocabularyScreen props
    const { list, navigation } = props;

    // mapStateToProps
    const { stateWords } = props;
    
    const listWords = stateWords.filter(word => {
        return word.list._id === list._id
    })


    return (

        // Navigates to WordListScreen and passes the list to be displayed
        <TouchableWithoutFeedback onPress={() => navigation.navigate('WordList', {'list': list})}>
            <View style={styles.container}>
                
                {/* List title and word count */}
                <View>
                    <Text style={styles.title}>{list.title}</Text>
                    <Text style={styles.count}>{listWords.length} Words</Text>
                </View>
                <Entypo style={styles.chevron} name="chevron-right" size={24} color="lightgrey" />
            </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        paddingVertical: 21,
        paddingBottom: 19,
        marginVertical: 7,
        marginHorizontal: 20,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        shadowColor: "#1f2023",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2,
        elevation: 0
    },

    title: {
        marginBottom: 7,
        fontFamily: 'lato-bold',
        fontSize: 14,
        color: '#2e2c2c',

    },

    count: {
        fontSize: 12,
        color: 'lightgrey',
        fontFamily: 'lato-bold',
    }
})

const mapStateToProps = state => ({
    stateWords: state.words.words
})

export default connect(mapStateToProps)(VocabularyItem);