import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function PostButton({
    label="Post",
    containerStyle,
    labelStyle,
    onPress,
    isLoading,
    disabled
}) {
    return (
        <TouchableOpacity 
            disabled={disabled||isLoading} 
            onPress={onPress} 
            style={[
                styles.postBtn, 
                isLoading && 
                styles.disabled, 
                containerStyle
            ]}
        >
            {
                isLoading ?
                <ActivityIndicator size="small" color="#f7702d" />
                :
                <>
                    <Text style={[styles.post, labelStyle]}>{label} </Text>
                    <Ionicons name="ios-send" size={15} color="white" />
                </>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    postBtn: {
        backgroundColor: "#7536ad",
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:25,
        flexDirection:"row",
        alignItems:"center"
    },

    post: {
        color:"#fff",
        fontFamily: 'Open-Sans-Bold'
    },

    disabled: {
        opacity:0.5
    }
})
