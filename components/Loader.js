import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function Loader({
    containerStyle
}){
    return (
        <View style={[styles.container, containerStyle]}>
            <ActivityIndicator size="large" color="#f7702d"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position:"absolute",
        backgroundColor:"#000",
        opacity:0.5,
        top:0,
        bottom:0,
        right:0,
        left:0,
        justifyContent:"center",
        alignItems:"center",
        zIndex:25
    }
})
