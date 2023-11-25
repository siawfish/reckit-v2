import React from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'

export default function About(){
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <Text style={styles.topic}>About Reckit</Text>
            <Text style={styles.text}>
                RECKIT has been Setup to give access to local businesses of all sizes and categories, across some selected African countries.
            </Text>
            <Text style={styles.text}>
                To simplify the possibilities of a business owners having their service visible to local & tourist visitors.
                Simply create an account via Facebook or Gmail in 2steps and list your business or event. ID Verification via email: support@reckitonline.com
                Likewise, can browse events happening near your or businesses established around you in real-time. No need to google or to know the exact small or corner shop that might not be listed on google because it’s very niche or no real physical structure. As a Browser you have the power to review and recommend services rendered as well as benefits of discount codes when you make a reservation via the app.
                As a business you have the advantage to gain more visibility and organic advertising through the great customer service you provide.
            </Text>
            <Text style={styles.text}>
                RECKIT: Blend into your current location by finding that talented hairbraiders / tailors / barberhops / fittingshop / artist / beautyshop. Equally can enjoy the fancy bars, chop bars and restaurants / hotels / malls / beaches / upcoming Events & hangout lounges
            </Text>
            <Text style={[styles.text, {marginBottom:40}]}>
                RECKIT: The go to App for local events and reducing the stress of being stranded at a location due to car mechanic failure and not knowing where to find a mechanic shop.
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff",
        paddingHorizontal:30,
        paddingVertical:20
    },

    topic: {
        fontSize:20,
        paddingVertical:20,
        color:"#444",
        fontFamily: 'Open-Sans'
    },

    text: {
        color:"#444",
        paddingVertical:10,
        fontFamily: 'Open-Sans'
    }
})
