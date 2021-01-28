import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getReview } from '../actions/review';
import RankingItem from '../components/RankingItem';


const RankingScreen = (props) => {
    const { navigation } = props;

    // mapStateToProps
    const { getReview } = props;

    // Reset review list 
    navigation.addListener('didFocus', () => {
        getReview();
      }
    );

    return (
        <>
            {/* Header */}
            {/* <View style={styles.backgroundHeader}>
                <Text style={styles.title}>Ranking</Text>
            </View> */}

            <View style={styles.backgroundContent}>
                <RankingItem emoji="🎓" title="Mastered" rating={[18, 200]} color="#40D642" navigation={navigation} />
                <RankingItem emoji="🍾" title="Almost there" rating={[16, 17]} color="#55E659" navigation={navigation} />
                <RankingItem emoji="♠️" title="Acing it" rating={[14, 15]} color="#96EC4E" navigation={navigation} />
                <RankingItem emoji="✨" title="Getting pretty good" rating={[12, 13]} color="#FFEA03" navigation={navigation} />
                <RankingItem emoji="🎩" title="Keep going" rating={[10, 11]} color="#FFDA36" navigation={navigation} />
                <RankingItem emoji="🏳" title="Half way there" rating={[8, 9]} color="#FFC71E" navigation={navigation} />
                <RankingItem emoji="💎" title="Getting there" rating={[6, 7]} color="#FFAE36" navigation={navigation} />
                <RankingItem emoji="📖" title="Needs some work" rating={[4, 5]} color="#FF7736" navigation={navigation} />
                <RankingItem emoji="🗝" title="Recently learned" rating={[2, 3]} color="#FF3938" navigation={navigation} />
                <RankingItem emoji="🧊" title="Getting started" rating={[0, 1]} color="#ED1D1B" navigation={navigation} />
            </View>
        </>
    )
}


const styles = StyleSheet.create({

    backgroundHeader: {
        padding: 30,
        paddingBottom: 10,
        paddingTop: 40
    },

    backgroundContent: {
        flex: 1,
        marginTop: '7%'
    },

    title: {
        color: '#413d3d',
        fontSize: 24,
        fontFamily: 'lato-black',
        marginBottom: 7
    },

    close: {
        marginTop: 20,
        color: '#1c1e21'
    }
})

export default connect(null, { getReview })(RankingScreen);