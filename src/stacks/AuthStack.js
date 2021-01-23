import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Auth = createStackNavigator();

const AuthStack = () => (
    <Auth.Navigator
        initialRouteName='Login'
        screenOptions={{
            cardStyle: {
                backgroundColor: 'white'
              },
            headerShown: false,
            headerLeft: () => null
        }}
    >
        <Auth.Screen name='Login' component={LoginScreen} />
        <Auth.Screen name='Signup' component={SignupScreen} />
    </Auth.Navigator>
)


export default AuthStack;