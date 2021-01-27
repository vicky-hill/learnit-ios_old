import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getReview } from '../actions/review';


const RankingItem = (props) => {

    // RankingScreen props
    const { emoji, title, rating, color, navigation } = props;

    // actions
    const { getReview } = props;

    mapStateToProps 
    const { words } = props;

    // Get words based on rating prop
   const rankWords = words.filter(word => {
       return word.rating >= rating[0] && word.rating <= rating[1];
   })
   
    return (
        <View style={styles.container}>

            {/* Emoji and level name */}
            <TouchableOpacity style={styles.level}>
                <Text style={styles.levelEmoji}>{emoji}</Text>
                <Text style={styles.levelTitle}>{title}</Text>
            </TouchableOpacity>

            {/* Word count tag */}
            <TouchableOpacity
                style={[styles.count, { backgroundColor: color }]}
                onPress={() => {
                    if(rankWords.length > 0) {
                        getReview(rankWords);
                        navigation.navigate('ReviewI');
                    }
                }}
            >
                <Text style={styles.countTag}>{rankWords && rankWords.length}</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 7,
        paddingRight: 35
    },

    level: {
        flexDirection: 'row'
    },

    levelEmoji: {
        fontSize: 17
    },

    levelTitle: {
        fontFamily: 'lato-regular',
        marginLeft: 15,
        fontSize: 15
    },

    count: {
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 7,
        width: 50,
        alignItems: 'center'
    },

    countTag: {
        fontFamily: 'lato-black',
        color: '#fff'
    }
})

const mapStateToProps = state => ({
    words: state.words.words

})

export default connect(mapStateToProps, { getReview })(RankingItem);