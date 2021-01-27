import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { header } from './_config';

// Screens
import VocabularyScreen from '../screens/VocabularyScreen';
import WordListScreen from '../screens/WordListScreen';
import EditScreen from '../screens/EditScreen';


const Vocabulary = createStackNavigator();

// const Edit = createStackNavigator();

// const EditStack = () => (
//     <Edit.Navigator
//         mode='modal'
//     >
//         <Edit.Screen name='EditStack' component={EditScreen} />
//     </Edit.Navigator>
// )

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
        {/* <Vocabulary.Screen name='Edit' component={EditStack} /> */}
    </Vocabulary.Navigator>
)


export default VocabularyStack;