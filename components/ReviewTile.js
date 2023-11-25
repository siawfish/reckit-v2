import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import propic from '../assets/propic.png'
import dayjs from 'dayjs'

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function ReviewTile({
    review
}){
    return (
        <View style={styles.reviewWrapper}>
            <View style={styles.reviewInfoWrapper}>
                <Image style={styles.propic} source={review?.author?.avatar ? {uri:review?.author?.avatar} : propic } />
                <View style={styles.reviewInfo}>
                    <View style={styles.nameRow}>
                        <Text style={styles.review}>{review.author.name}</Text>
                        <Text style={styles.timestamp}>{dayjs.unix(review?.createdAt?.seconds).from(dayjs(), true)}</Text>
                    </View>
                    <Text style={{fontFamily: 'Open-Sans'}}>{review?.message}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    reviewWrapper: {
        paddingVertical:15,
        flexDirection:"row",
        borderBottomColor:"#eee",
        borderBottomWidth:1,
        flex:1
    },

    propic: {
        width:40,
        height:40,
        borderRadius:20
    },

    reviewInfoWrapper: {
        flexDirection:"row",
        flex:1
    },

    reviewInfo: {
        marginHorizontal:8,
        flex:1
    },

    review: {
        color:"#f2bc3f",
        fontFamily: 'Open-Sans-Bold',
        textTransform:"capitalize"
    },

    timestamp: {
        color:"grey",
        fontSize:10,
        paddingVertical:5,
        fontFamily: 'Open-Sans'
    },

    nameRow: {
        flexDirection:"row",
        justifyContent:"space-between"
    }
})
