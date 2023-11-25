import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'


export default function CancelButton({
    onPress,
    containerStyle,
    btnText,
    label="Cancel",
    iconColor="white"
}){
    return (
        <TouchableOpacity onPress={onPress} style={[styles.cancelBtn, containerStyle]}>
            <Text style={[styles.btnText, btnText]}>{label}</Text>
            <MaterialCommunityIcons name="close" size={24} color={iconColor} />
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

    cancelBtn: {
        flexDirection:"row",
        alignItems:"center",
        alignSelf:"flex-end"
    }
})
