import React from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Linking } from 'react-native'
import FAQTile from '../components/FAQTile'

const faq = [
    {
        q:"How do i login or register?",
        a:"Simply go to the profile / login page and register with your google or facebook account."
    },
    {
        q:"Why is my account inactive?",
        a:"When a business is created, you need to send a copy of personal ID to support@reckitonline.com within 2 business working days to authenticate your account. Failure will result in removal of business listing."
    },
    {
        q:"How do i create a business or event?",
        a:"Simply login or register and click on the list business and follow the instruction. After creating a business or event. Go to edit after choosing the business to update opening time and other relevant information. You can then set your business to publish to make it visible to RECKIT Users. Do remember  RECKITonline reserves the right to reject or delete a business deemed as inappropriate or not to standard."
    },
    {
        q:"How do i delete my business?",
        a:"To delete an event or business listing, first you can unpublish it. This turns visibility to public off. You can also simply email support@reckitonline.com with business/event name and we will be happy to delete it. We will send you a notification email when this is done. How do i logout/delete my profile? Simply go to the settings menu and click on the logout/delete account button"
    }
]

function Footer(){
    const sendEmail = ()=> {
        Linking.openURL('mailto:support@reckitonline.com') 
    }

    return(
        <View style={styles.footer}>
            <Text style={styles.text}>Can't find the right answer to your questions? We are here to help you.</Text>
            <TouchableOpacity onPress={sendEmail}>
                <Text style={styles.link}>Email our support team.</Text>
            </TouchableOpacity>
        </View>
    )
}

export default function FAQ(){
    return (
        <View style={styles.container}>
            <Text style={styles.topic}>Frequently Asked Questions</Text>
            <FlatList
                data={faq}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=><FAQTile title={item.q} answer={item.a} />}
                keyExtractor={item=>item.q}
                ListFooterComponent={<Footer />}
            />
        </View>
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

    footer: {
        paddingVertical:30
    },

    text: {
        textAlign:"center",
        paddingVertical:20,
        fontFamily: 'Open-Sans'
    },

    link: {
        textAlign:"center",
        color:"#7536ad",
        textDecorationLine:"underline",
        fontFamily: 'Open-Sans'
    }
})
