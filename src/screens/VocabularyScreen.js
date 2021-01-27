import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import { deleteList } from '../actions/lists';
import { deleteWord } from '../actions/words';
import { openEdit, toggleSlide } from '../actions/utils';
import VocabularyItem from '../components/VocabularyItem';
import WordListItem from '../components/WordListItem';
import SearchBar from '../components/SearchBar';
import SlideScreen from '../components/SlideScreen';
import EditForm from '../components/EditForm';
import HiddenItemWithActions from '../components/HiddenItemWithActions';


const VocabularyScreen = (props) => {
    const { navigation } = props;

    // actions
    const { deleteList, toggleSlide, openEdit, deleteWord } = props

    // mapStateToProps
    const { words, lists, editMode, search } = props;
 
    // If searchbar is being used, filter all words for search results
    const searchResults = words.filter(word => {
        return word.english.toLowerCase().includes(search.toLowerCase()) ||
            word.spanish.toLowerCase().includes(search.toLowerCase())
    })


    // hidden edit button
    const editRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }

        toggleSlide();

        // Check if VocabularyItems are shown or WordListItems as searchResults
        if (!search) {
            const editData = [lists.find(list => list._id === rowKey).title];
            const editId = rowKey;

            openEdit('editList', editData, editId);

        } else {
            const editData = [
                words.find(word => word._id === rowKey).spanish,
                words.find(word => word._id === rowKey).english
            ]

            const editId = rowKey;

            openEdit('editWord', editData, editId);
        }
    }


    // hidden delete button
    const deleteRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();

            if (!search) {
                // Delete list, rowKey = id
                deleteList(rowKey)
            } else {
                deleteWord(rowKey)
            }
        }
    }


    return (
        <>
            {/* Header with word count and Add new Word button */}
            <View style={styles.backgroundHeader}>
                <View style={styles.header}>
                    <Text style={styles.title}>{words.length} Words</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => {
                            toggleSlide();
                            openEdit('createList');
                        }}
                    >
                        <Feather name="plus" size={17} color="#f3c74f" />
                        <Text style={styles.addButtonText} >Add new list</Text>
                    </TouchableOpacity>
                </View>
                <SearchBar />
            </View>

            {/* Render vocabulary lists or search results */}
            <View style={styles.backgroundContent}>
                <SwipeListView
                    showsHorizontalScrollIndicator={false}
                    data={!search ? lists : searchResults}
                    keyExtractor={(list) => list._id}
                    renderItem={({ item }) => {
                        return !search ?
                            <VocabularyItem list={item} navigation={navigation} /> :
                            <WordListItem word={item} />

                    }}
                    renderHiddenItem={({ item }, rowMap) => {
                        return (
                            <HiddenItemWithActions
                                data={item}
                                rowMap={rowMap}
                                onEdit={() => editRow(rowMap, item._id)}
                                onDelete={() => deleteRow(rowMap, item._id)}
                                item={!search ? item.title : item.spanish}
                            />
                        )
                    }}
                    rightOpenValue={-170}
                />
            </View>

            <SlideScreen>
                <EditForm
                    headerText={editMode === 'createList' ? 'Create new list' : editMode === 'editList' ? 'Update list' : 'Update word'}
                    type="list"
                    buttonText="Save list"
                    firstPlaceholder="List name"
                />
            </SlideScreen>
        </>
    )
}



const styles = StyleSheet.create({

    backgroundHeader: {
        backgroundColor: '#FFF',
        paddingVertical: 50,
        paddingHorizontal: 30,
        paddingBottom: 30
    },

    backgroundContent: {
        backgroundColor: '#fcfcfc',
        flex: 1,
        paddingTop: 15
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 25
    },

    title: {
        color: '#f3c74f',
        fontSize: 27,
        fontFamily: 'lato-black'
    },

    addButton: {
        flexDirection: 'row'
    },

    addButtonText: {
        color: '#f3c74f',
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 5
    }
})


const mapStateToProps = state => ({
    words: state.words.words,
    lists: state.lists.lists,
    editMode: state.utils.edit.editMode,
    search: state.utils.search.term
})



export default connect(mapStateToProps, { toggleSlide, openEdit, deleteList, deleteWord })(VocabularyScreen)

