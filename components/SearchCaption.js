import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default function SearchCaption({
    business,
    location
}){
    return (
        <View style={styles.searchCaptionWrapper}>
            <Text style={styles.searchCaption}>
                Search results of 
                <Text style={styles.colorText}> {business=="" ? "All Businesses" : business}</Text> in 
                <Text style={styles.colorText}> {location=="" ? "My Location" : location}</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    searchCaption: {
        fontSize:16,
        fontFamily: 'Open-Sans-Bold',
        backgroundColor:"#fff",
        paddingVertical:20,
        paddingHorizontal:15
    },

    colorText: {
        color:"#7536ad",
        fontFamily: 'Open-Sans-Bold'
    }
})
