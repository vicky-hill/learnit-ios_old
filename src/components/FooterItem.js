import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 


const FooterItem = (props) => {
    // HomeScreen props
    const { title, icon } = props;

    return (
        <View style={styles.container} >
            <Image style={styles.icon} source={icon} />
            <Text style={styles.title}>{title}</Text>
            <Entypo style={styles.chevron} name="chevron-right" size={24} color="lightgrey" />
        </View>
    )
}


const styles = StyleSheet.create({
    
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f1eeee', 
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 20,
        paddingHorizontal: 40
    },

    title: {
        fontSize: 16,
        fontFamily: 'lato-bold',
        marginLeft: 20,
        color: '#2e2c2c'
    },

    icon: {       
        resizeMode: 'contain',
        width: 30,
        height: 30
    },
    
    chevron: {
        position: 'absolute',
        right: 0,
        paddingRight: 40
    }
})


export default FooterItem;