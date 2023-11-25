import React from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'

export default function AboutTab({
    business
}) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.sectionWrapper}>
                <Text style={styles.title}>About this place</Text>
                <Text style={{fontFamily: 'Open-Sans'}}>{business?.about==null ? "No data" : business.about}</Text>
            </View>
            <View style={styles.sectionWrapper}>
                <Text style={styles.title}>Reservation Details</Text>
                <Text style={{fontFamily: 'Open-Sans'}}>{business.reservation_detail==null ? "Please call or email us directly" : business.reservation_detail}</Text>
            </View>
            <View style={styles.sectionWrapper}>
                <Text style={styles.title}>Contact Info</Text>
                <View style={styles.contactWrapper}>
                    <Text style={styles.contactTextLeft}>{business.contact_phone==null ? "No Data" : business.contact_phone}</Text>
                    <Text style={styles.contactTextRight}>Call Now</Text>
                </View>
            </View>
            <View style={styles.sectionWrapper}>
                <View style={[styles.contactWrapper, {marginTop:10}]}>
                    <Text style={styles.contactTextLeft}>{business.contact_email==null ? "No Data" : business.contact_email}</Text>
                    <Text style={styles.contactTextRight}>Send Email</Text>
                </View>
            </View>
            <View style={styles.sectionWrapper}>
                <View style={[styles.contactWrapper, {marginTop:10}]}>
                    <Text style={styles.contactTextLeft}>{business.contact_website==null ? "No Data" : business.contact_website}</Text>
                    <Text style={styles.contactTextRight}>Open Web</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#fff",
        paddingBottom: 50
    },
    sectionWrapper: {
        padding:10,
        borderBottomColor:"#eee",
        borderBottomWidth:1,
        backgroundColor:"#fff"
    },

    title: {
        color:"#7536ad",
        paddingBottom:20,
        fontSize:12,
        fontFamily: 'Open-Sans-Bold'
    },

    contactWrapper: {
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:10 
    },

    contactTextRight: {
        color:"#7536ad",
        paddingRight:10,
        fontFamily: 'Open-Sans-Bold'
    },

    contactTextLeft: {
        fontFamily: 'Open-Sans-Bold',
        width:"80%"
    }
})
