import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import img from '../assets/Asset_23.png'
import { useNavigation } from '@react-navigation/native'

export default function ReckitButton(props) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={()=>navigation.navigate("Reckit")} style={[styles.imgWrapper, props.accessibilityState.selected&&styles.shadow]}>
            <Image source={img} style={styles.img} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imgWrapper: {
        backgroundColor:"white",
        width:40,
        height:40,
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent:"center",
        alignItems:"center",
        marginTop:3
    },

    shadow: {
        shadowColor: "#7536ad",
    },

    img: {
        width:20,
        height:20
    }
})
