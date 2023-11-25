import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import propic from '../assets/propic.png'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'

export default function Question({
    item,
    toggleShowComment=()=>null,
    commentsCount
}) {
    return (
        <View style={styles.reckonWrapper}>
            <Image style={styles.propic} source={item?.author?.avatar ? {uri:item?.author?.avatar} : propic} />
            <View style={styles.reckonInfo}>
                <View style={styles.reckonOwnerRow}>
                    <Text numberOfLines={1} style={styles.reckonOwner}>{item?.author?.displayName}</Text>
                    <View style={styles.dot}></View>
                    <Text style={styles.timestamp}>{item?.createdAt?.seconds ? dayjs.unix(item?.createdAt?.seconds).fromNow() : dayjs(item?.createdAt).fromNow() }</Text>
                </View>
                <Text style={styles.reckon}>{item?.message}</Text>
                <TouchableOpacity onPress={toggleShowComment} style={styles.reckonStatWrapper}>
                    <MaterialCommunityIcons name="comment" size={20} color="#7536ad" />
                    <Text style={styles.reckonStat}>{commentsCount}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    reckonWrapper: {
        paddingVertical:10,
        flexDirection:"row",
        backgroundColor:"#fff",
        paddingHorizontal:10
    },

    propic: {
        width:50,
        height:50,
        borderRadius:25,
        marginRight:10
    },

    dot: {
        width:3,
        height:3,
        borderRadius:1.5,
        backgroundColor:"#e0e0e0",
        marginHorizontal:5
    },

    reckonOwnerRow: {
        flexDirection:"row",
        alignItems:"center",
        flex:1
    },

    reckonOwner: {
        color:"#444",
        textTransform:"capitalize",
        fontFamily: 'Open-Sans-Bold',
        width:"70%"
    },

    reckonInfo: {
        width:"80%"
    },

    reckon: {
        color:"#444",
        paddingVertical:8,
        fontFamily: 'Open-Sans'
    },

    reckonStatWrapper: {
        flexDirection:"row",
        alignItems:"center",
        alignSelf:"flex-end"
    },

    reckonStat: {
        color:"#444",
        paddingHorizontal:3,
        fontSize:14,
        fontFamily: 'Open-Sans-Bold'
    },

    timestamp: {
        color:"grey",
        fontSize:12,
        fontFamily: 'Open-Sans',
        textAlign:"right"
    }
})
