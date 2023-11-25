import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function FloatingButton({
    onPress,
    icon=<Ionicons name="md-add" size={24} color="white" />,
    containerStyle
}) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.addListing, containerStyle]}>
            {icon}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addListing: {
        backgroundColor:"#7536ad",
        width:60,
        height:60,
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position:"absolute",
        bottom:50,
        right:20,
        zIndex:2
    }
})
