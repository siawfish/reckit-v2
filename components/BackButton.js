import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function BackButton({
    onPress,
    containerStyle,
    color
}){
    return (
        <TouchableOpacity onPress={onPress} style={[styles.backBtn, containerStyle]}>
            <Ionicons name="ios-arrow-back" size={24} color={color||"white"} />
            <Text style={[styles.btnText, {color:color}]}>Back</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnText: {
        color:"white",
        fontSize:16,
        marginLeft:5,
        textAlign:"center",
        fontFamily: 'Open-Sans-Bold'
    },

    backBtn: {
        flexDirection:"row",
        alignItems:"center"
    }
})
