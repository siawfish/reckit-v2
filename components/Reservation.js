import React from 'react'
import { Text, StyleSheet, View, TextInput, ScrollView } from 'react-native'

export default function Reservation({
    reservation,
    onChangeText
}){
    return (
        <ScrollView style={{backgroundColor:"#fff"}}>
            <View style={styles.section}>
                <Text style={styles.title}>Reservation Detail</Text>
                <View style={styles.descWrapper}>
                    <TextInput 
                        multiline 
                        style={styles.desc} 
                        placeholder="Tell your customers how to make a reservation..." 
                        defaultValue={reservation}
                        onChangeText={(text)=>onChangeText("reservation_detail",text)}
                    />
                </View>
                <Text style={styles.descCount}>{!reservation?300:300-reservation?.length} characters left</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        color:"#7536ad",
        fontSize:12,
        paddingBottom:10,
        fontFamily: 'Open-Sans-Bold'
    },

    desc: {
        marginBottom:10,
        textAlignVertical:"top",
        fontFamily:"Open-Sans"
    },

    descCount: {
        color:"#7536ad",
        fontSize:12,
        alignSelf:"flex-end",
        fontFamily: 'Open-Sans'
    },

    section: {
        paddingHorizontal:15,
        borderBottomWidth:1,
        borderBottomColor:"#e0e0e0",
        paddingVertical:15
    }
})
