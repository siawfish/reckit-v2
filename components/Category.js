import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import CategoryIcon from './CategoryIcon'

export default function Category({
    navigation,
    type,
    caption
}) {

    const navigate = ()=> {
        if(type==="more"){
            navigation.navigate("Search")
        } else {
            navigation.navigate("Search", {category:caption})
        }
    }
    
    return (
        <TouchableOpacity onPress={navigate} style={styles.container}>
            <CategoryIcon type={type} />
            <Text style={styles.caption}>{caption}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent:"center",
        alignItems:"center",
        flex:1
    },

    caption: {
        paddingVertical:3,
        fontFamily: 'Open-Sans',
        fontSize:12
    }
})
