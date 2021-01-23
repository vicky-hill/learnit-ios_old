import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'

const HiddenItemWithActions = ({ onEdit, onDelete, item }) => {

    const confirmDelete = () =>
    Alert.alert(
      `Delete "${item}"?`,
      "",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: () => onDelete() }
      ],
      { cancelable: true }
    );

    return (
        <View style={styles.hidden}>
            
            {/* Delete button */}
            <TouchableOpacity style={[styles.icon, styles.delete]} onPress={confirmDelete}>
                <FontAwesome name="trash" size={24} color="salmon" />
            </TouchableOpacity>

            {/* Edit button */}
            <TouchableOpacity style={[styles.icon, styles.edit]} onPress={onEdit}>
                <MaterialIcons name="edit" size={24} color="grey" />
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({

    hidden: {
        position: 'absolute',
        marginTop: 10,
        right: 20,
        height: '80%',
        width: 160,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden'
    },

    icon: {
        height: '100%',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    delete: {
        backgroundColor: '#f8e1e1'
    },

    edit: {
        backgroundColor: 'gainsboro'
    }
})

export default HiddenItemWithActions;