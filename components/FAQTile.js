import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default function FAQTile({
    title,
    answer
}){
    return (
        <View style={styles.faqWrapper}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{answer}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    faqWrapper: {
        paddingVertical:15,
        borderBottomColor:"#e0e0e0",
        borderBottomWidth:1
    },

    title: {
        paddingBottom:10,
        color:"#7536ad",
        fontSize:17,
        fontFamily: 'Open-Sans'
    },

    text: {
        color:"#444",
        fontFamily: 'Open-Sans'
    }
})
