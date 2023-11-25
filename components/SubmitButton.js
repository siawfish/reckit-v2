import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'

export default function SubmitButton({
    onPress,
    containerStyle,
    label,
    isLoading,
    disabled
}){
    return (
        <TouchableOpacity 
            disabled={isLoading||disabled} 
            onPress={onPress} 
            style={[
                    styles.createBtn, 
                    disabled &&  styles.disabled,
                    isLoading &&  styles.disabled,
                    containerStyle
                ]}
            >
            <Text style={styles.btnText}>
                {
                    isLoading ?
                    <ActivityIndicator color="white" size="small" /> :
                    label
                }
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    createBtn: {
        backgroundColor:"#ffa300",
        paddingVertical:10,
        borderRadius:25,
        marginVertical:20,
        justifyContent:"center",
        alignItems:"center"
    },

    btnText: {
        color:"white",
        fontSize:16,
        marginLeft:5,
        textAlign:"center",
        fontFamily: 'Open-Sans-Bold'
    },

    disabled: {
        opacity:0.5
    }
})
