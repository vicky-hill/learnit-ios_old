import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { connect } from 'react-redux';
import { getSearchTerm, clearSearch } from '../actions/utils';


const SearchBar = ({ getSearchTerm, searchTerm, clearSearch }) => {

    return ( 
        <View style={styles.background}>
            
            {/* Magnifying glass icon */}
            <Ionicons 
                name="search" 
                style={styles.iconStyle} 
                color="darkgrey" 
            />

            {/* Searchbar input */}
            <TextInput 
                style={styles.inputStyle} 
                placeholder="Search Vocabulary" 
                value={searchTerm}
                onChangeText={(input) => getSearchTerm(input)}
                autoCapitalize="none"
            />

        </View>
    )
}


const styles = StyleSheet.create({
    
    background: {
        backgroundColor: '#FFF',
        height: 45,
        borderRadius: 50,
        flexDirection: 'row',
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.10,
        shadowRadius: 2.84,
        elevation: 1
         
    },

    inputStyle: {
        flex: 1,
        fontSize: 15,
        fontFamily: 'lato-regular'
    },

    iconStyle: {
        fontSize: 20,
        alignSelf: 'center',
        marginHorizontal: 15
    }
})


const mapStateToProps = state => ({
    searchTerm: state.utils.search.term
})

export default connect(mapStateToProps, { getSearchTerm, clearSearch })(SearchBar);