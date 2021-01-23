import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { header } from './_config';

// Screens
import VocabularyScreen from '../screens/VocabularyScreen';
import WordListScreen from '../screens/WordListScreen';


const Vocabulary = createStackNavigator();

const VocabularyStack = () => (
    <Vocabulary.Navigator
        mode='card'
        
        screenOptions={{
            ...header,
            animationEnabled: true
        }}
    >
        <Vocabulary.Screen name='Vocabulary' component={VocabularyScreen} />
        <Vocabulary.Screen name='WordList' component={WordListScreen} />
    </Vocabulary.Navigator>
)


export default VocabularyStack;