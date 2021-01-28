import React, { useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import book from '../../assets/icons/book-icon.png';
import bubble from '../../assets/icons/speechbubble-icon.png';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getWords } from '../actions/words';
import { getLists } from '../actions/lists';
import { getReview } from '../actions/review';
import { logout } from '../actions/auth';
import FooterItem from '../components/FooterItem';
import SideScreen from '../components/SideScreen';



const HomeScreen = (props) => {
    const { navigation } = props;

    // actions
    const { getWords, getLists, getReview, logout } = props;

    // mapStateToProps
    const { words: { loading, words }, review: { list }, user } = props;

    // Refresh review list when HomeScreen is focused
    useFocusEffect(
        useCallback(() => {
            getReview();
        }, [])
    );


    // Load all words and lists
    useEffect(() => {
        getWords();
        getLists();
        getReview();
    }, [])


    const goldCircle = (
        <TouchableOpacity onPress={() => { navigation.navigate('Ranking') }}>
            <View style={styles.circle}>
                <Image style={styles.image} source={require('../../assets/gold-circle.png')} />
                <Text style={styles.writing}>All done!</Text>
                <Text style={[styles.tag, styles.allDone]}>{words.length} Words  ✓</Text>
            </View>
        </TouchableOpacity>
    )

    const silverCircle = (

        <TouchableOpacity onPress={() => navigation.navigate('ReviewI')}>
            <View style={styles.circle}>
                <Image style={styles.image} source={require('../../assets/silver-circle.png')} />
                <Text style={styles.writing}>Review!</Text>
                <Text style={[styles.tag, styles.review]}>
                    <Feather name="book-open" size={18} color="#fcc200" />  {list && list.length}
                </Text>
            </View>
        </TouchableOpacity>

    )


    return (
        <>
            {
                !loading && (
                    <>
                        {/* Golden circle when review = 0, otherwise silver circle */}
                        <View style={styles.main}>
                            {
                                !list.length ? goldCircle : silverCircle
                            }
                        </View>

                        {/* Vocabulary Footer */}
                        <TouchableOpacity onPress={() => navigation.navigate('Vocabulary')}>
                            <FooterItem title="Vocabulary" icon={book} />
                        </TouchableOpacity>

                        {/* Conjugation Footer */}
                        <TouchableOpacity onPress={() => navigation.navigate('Conjugation')}>
                            <FooterItem title="Conjugation" icon={bubble} />
                        </TouchableOpacity>

                        {/* Side Menu */}
                        <SideScreen>
                            <View style={styles.menu}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.menuSubtitle}>Signed in as </Text>
                                    <Text style={styles.menuTitle}> { user && user.name }</Text>
                                </View>
                                <TouchableOpacity style={styles.menuButton} onPress={logout}>
                                    <Text style={styles.menuButtonText}>Log out</Text>
                                </TouchableOpacity>
                            </View>
                        </SideScreen>
                    </>
                )
            }
        </>
    )
}




const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    circle: {
        bottom: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    image: {
        resizeMode: 'contain',
        height: 240
    },

    writing: {
        color: 'white',
        position: 'absolute',
        fontSize: 70,
        fontWeight: 'bold',
        fontFamily: 'great-vibes',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.75,
        shadowRadius: 4.84,
        elevation: 5,
    },

    tag: {
        position: 'absolute',
        right: 0,
        bottom: 40,
        paddingHorizontal: 13,
        paddingVertical: 7,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: 'white',
        overflow: "hidden",
        fontFamily: 'lobstertwo-bold',
        fontSize: 16
    },

    allDone: {
        backgroundColor: '#E8C157',
        color: 'white'
    },

    review: {
        // backgroundColor: '#f8e1e1',
        // color: 'lightcoral',
        backgroundColor: '#fff4d5',
        color: '#fcc200',
        right: 15,
        borderColor: '#fcc200'
    },

    menu: {
        padding: 30,
        paddingTop: 50
    },

    menuSubtitle: {
        fontFamily: 'lato-regular'
    },

    menuTitle: {
        fontFamily: 'lato-black'
    },

    menuButton: {
        width: '100%',
        backgroundColor: '#f3c74f',
        color: '#fff',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginTop: 25
    },

    menuButtonText: {
        color: '#fff',
        fontFamily: 'lato-black'
    },
})



const mapStateToProps = state => ({
    words: state.words,
    review: state.review,
    user: state.auth.user
})

export default connect(mapStateToProps, { getWords, getLists, getReview, logout })(HomeScreen)