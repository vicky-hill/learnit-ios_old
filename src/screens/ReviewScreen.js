import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { checkAnswer, showAnswer } from '../actions/review';



const ReviewScreen = (props) => {
    const { navigation } = props;

    // actions
    const { checkAnswer, showAnswer } = props;

    // mapStateToProps
    const { review: { list, currentWord, correct, incorrect } } = props;


    // Get the current word
    const { word, translation, id } = currentWord;
    

    // Form State
    // const [placeholder, setPlaceholder] = useState('Translate');
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


    // function showPlaceholder() {
    //     !input ? setPlaceholder('Translate') : setPlaceholder('')
    // }




    return (

        <View style={styles.container}>
            <Text style={styles.word}>{translation}</Text>
            <TextInput
                blurOnSubmit={false}
                autoCorrect={false}
                autoFocus={true}
                style={styles.input}
                autoCapitalize='none'
                selectionColor={'#f3c74f'}

                style={[styles.input, correct && styles.correctAnswer, incorrect && styles.incorrectAnswer]}

                // placeholder={placeholder}

                // Hide placeholder while reviewing
                // onFocus={() => setPlaceholder('')}
                // onBlur={showPlaceholder}
                value={input}

                // Disable input while correct word confirm
                onChangeText={(newInput) => !correct && setInput(newInput)}

                // Hide cursor while correct confirm
                selectionColor={!correct && !incorrect ? '#f5dfa3' : 'rgba(255, 0, 255, 0)'}
                onSubmitEditing={() => {
                    showAnswer(input, word, id);
                    setInput(' ' + word + ' ');
                }}
            />
        </View>

    )
}



const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        marginTop: '40%'
    },

    word: {
        marginBottom: 0,
        fontFamily: 'lato-regular',
        fontSize: 20,
        color: 'lightgrey'
    },

    input: {
        height: 130,
        // backgroundColor: 'gold',
        width: '90%',
        textAlign: 'center',
        paddingTop: 10,
        paddingVertical: 40,
        paddingHorizontal: 0,
        fontFamily: 'lato-black',
        fontSize: 30
    },

    correctAnswer: {
        color: '#C7F798'
    },

    incorrectAnswer: {
        color: 'salmon'
    }
})


const mapStateToProps = state => ({
    review: state.review
})

export default connect(mapStateToProps, { checkAnswer, showAnswer })(ReviewScreen);
