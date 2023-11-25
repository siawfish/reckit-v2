import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default function NoListing({
    title="Do you have a business to promote?",
    caption="List your business on Reckit in a few clicks",
    btnText="Start listing now",
    icon=<MaterialIcons name="business" size={80} color="grey" />,
    showButton=true
}){
    return (
        <View style={styles.noListingWrapper}>
            {icon}
            <Text style={styles.boldText}>{title}</Text>
            <Text style={styles.caption}>{caption}</Text>
            {
                showButton &&
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>{btnText}</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    noListingWrapper: {
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:50,
        paddingHorizontal:50
    },

    boldText: {
        paddingVertical:10,
        fontFamily: 'Open-Sans-Bold',
        textAlign:"center"
    },

    btn: {
        borderWidth:2,
        borderColor:"#7536ad",
        borderRadius:25,
        paddingHorizontal:20,
        paddingVertical:10,
        width:"80%",
        alignSelf:"center",
        marginTop:40
    },

    btnText: {
        color:"#7536ad",
        textAlign:"center",
        fontFamily: 'Open-Sans'
    },

    caption: {
        fontFamily: 'Open-Sans',
        textAlign:"center"
    }
})
