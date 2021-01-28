import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { header } from './_config';
import { Ionicons } from '@expo/vector-icons'; 
import { connect } from 'react-redux';
import { toggleSide } from '../actions/utils';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ReviewScreenI from '../screens/ReviewScreenI';
import RankingScreen from '../screens/RankingScreen';


const Home = createStackNavigator();


const HomeStack = ({ toggleSide }) => (
    <Home.Navigator
        mode='modal'
        initialRouteName='Home'
        screenOptions={{
            ...header
        }}
    >
        
        <Home.Screen 
            name='Home' 
            component={HomeScreen} 
            options={{ headerLeft: () => 
                <Ionicons style={{marginLeft: 30}} name="ios-menu-outline" size={30} color="black" onPress={toggleSide} /> 
            }} />
            
        <Home.Screen name='ReviewI' component={ReviewScreen}  />
        <Home.Screen name='Ranking' component={RankingScreen} options={ {title: 'Ranking'}}  />

    </Home.Navigator>
)


export default connect(null, { toggleSide })(HomeStack);