import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { checkAnswer, showAnswer } from '../actions/review';


const ReviewScreenI = (props) => {
    const { navigation } = props;

    // actions
    const { checkAnswer, showAnswer } = props;

    // mapStateToProps
    const { review: { list, currentWord, correct, incorrect } } = props;
    

    // Get the current word
    const { word, translation, id } = currentWord;

    // Form State
    const [placeholder, setPlaceholder] = useState('Translate');
    const [input, setInput] = useState('');


    // Check answer
    useEffect(() => {
        checkAnswer(input, word, id);
    }, [input])


    // Reset input after correct word
    useEffect(() => {
        setInput('');
    }, [currentWord])

    const isFocused = useIsFocused();

    // Slide down screen when review list empty
    useEffect(() => {
        if (list.length === 0 && isFocused) {
            setTimeout(() => {
                navigation.goBack();
            }, 1000);
        }
    }, [list])


    function showPlaceholder() {
        !input ? setPlaceholder('Translation') : setPlaceholder('')
    }




    return (
        <>
            {/* Header word to translate */}
            <View style={styles.backgroundHeader}>
                <Text style={styles.word}>{translation}</Text>
            </View>

            <View style={styles.backgroundContent}>
                {/* Translate input */}
                <TextInput
                    blurOnSubmit={false}
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={[styles.translation, correct && styles.correctAnswer, incorrect && styles.incorrectAnswer]}
                    placeholder={placeholder}

                    // Hide placeholder while reviewing
                    onFocus={() => setPlaceholder('')}
                    onBlur={showPlaceholder}
                    value={input}

                    // Disable input while correct word confirm
                    onChangeText={(newInput) => !correct && setInput(newInput)}
                    selectionColor={'#f3c74f'}

                    // Hide cursor while correct confirm
                    selectionColor={!correct && !incorrect ? '#f3c74f' : 'rgba(255, 0, 255, 0)'}
                    onSubmitEditing={() => {
                        showAnswer(input, word, id);
                        setInput(' ' + word + ' ');
                    }}
                />

            </View>
        </>
    )
}


const styles = StyleSheet.create({

    backgroundHeader: {
        backgroundColor: '#fff',
        paddingVertical: 70,
        alignItems: 'center'
    },

    backgroundContent: {
        backgroundColor: '#fcfcfc',
        flex: 1,
        alignItems: 'center'
    },

    word: {
        fontFamily: 'lato-black',
        fontSize: 35,
        color: '#f3c74f'
    },

    translation: {
        backgroundColor: '#fff',
        width: '85%',
        borderRadius: 7,
        textAlign: 'center',
        marginVertical: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
        fontFamily: 'lato-regular',
        fontSize: 18,

        // borderWidth: 2,
        // borderColor: '#f1eeee',

        shadowColor: "#1f2023",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 2,
        elevation: 0
    },

    correctAnswer: {
        color: 'limegreen'
    },

    incorrectAnswer: {
        color: 'salmon'
    },

    close: {
        marginTop: 20,
        color: '#1c1e21'
    }
})


const mapStateToProps = state => ({
    review: state.review
})

export default connect(mapStateToProps, { checkAnswer, showAnswer })(ReviewScreenI);
