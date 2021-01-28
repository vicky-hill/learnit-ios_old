import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import pineapple from '../../assets/pineapple.png';
import { connect } from 'react-redux'
import { login, localLogin } from '../actions/auth';
import { clearError } from '../actions/alerts';
import ErrorMessage from '../components/ErrorMessage';


const LoginScreen = (props) => {
    const { navigation } = props;

    // actions
    const { login, localLogin, clearError } = props;

    // mapStateToProps
    const { error } = props;



    // Wait until AsyncStorage was checked for token
    const [loginCheck, setLoginCheck] = useState(false);

    // Form State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    // Run localLogin() and check if token exists in AsyncStorage
    if (!loginCheck) {
        return (
            <AppLoading
                startAsync={localLogin}
                onFinish={() => setLoginCheck(true)}
                onError={() => console.log('something went wrong with login')}
            />
        )
    }

    return (
        <View style={styles.container}>

            {/* Pinapple and Header */}
            <Image style={styles.pineapple} source={pineapple} />
            <Text style={styles.title} >Sign into your account</Text>

            {/* Error Message */}
            { error ? <ErrorMessage message={error} /> : null}

            {/* Username input */}
            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.input}
                placeholder="Username"
                selectionColor={'#f3c74f'}
                value={username}
                onChangeText={newInput => setUsername(newInput)}
            />

            {/* Password input */}
            <TextInput secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input} placeholder="Password"
                selectionColor={'#f3c74f'}
                value={password}
                onChangeText={newInput => setPassword(newInput)}
            />

            {/* Sign in button */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    login(username, password);
                    setTimeout(() => {
                        setUsername('');
                        setPassword('');
                    }, 2000);
                }}>
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>

            {/* Link to Signup page */}
            <TouchableOpacity 
                style={styles.link} 
                onPress={() => {
                    navigation.navigate('Signup');
                    clearError();
                }}>
                <Text style={styles.linkText}>Don't have an account? Sign up!</Text>
            </TouchableOpacity>

        </View>
    )
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 70,
        marginHorizontal: 35,
        alignItems: 'center'
    },

    pineapple: {
        resizeMode: 'contain',
        height: 100,
        marginBottom: 30
    },

    title: {
        fontFamily: 'lato-bold',
        fontSize: 16,
        marginBottom: 25
    },


    input: {
        borderWidth: 1,
        borderColor: 'gainsboro',
        padding: 12,
        borderRadius: 7,
        marginVertical: 8,
        width: '100%'
    },

    button: {
        width: '100%',
        backgroundColor: '#f3c74f',
        color: '#fff',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginTop: 25
    },

    buttonText: {
        color: '#fff',
        fontFamily: 'lato-black'
    },

    link: {
        width: '100%',
        paddingVertical: 15,
        marginTop: 5
    },

    linkText: {
        color: '#f3c74f',
        fontFamily: 'lato-bold',
    }

})



const mapStateToProps = state => ({
    error: state.alerts.error
})

export default connect(mapStateToProps, { login, clearError, localLogin })(LoginScreen)

