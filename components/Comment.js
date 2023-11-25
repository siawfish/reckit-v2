import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import propic from '../assets/propic.png'
import dayjs from 'dayjs'

export default function Comment({
    comment
}) {
    return (
        <View style={[styles.commentWrapper, {alignItems:"flex-start", borderBottomColor:"#f0f0f0", borderBottomWidth:1}]}>
            <Image style={styles.propicSmall} source={comment?.author?.avatar ? {uri:comment?.author?.avatar} : propic} />
            <View style={styles.comment}>
                <View style={styles.reckonOwnerRow}>
                    <Text numberOfLines={1} style={styles.reckonOwner}>{comment?.author?.displayName}</Text>
                    <View style={styles.dot}></View>
                    <Text style={styles.timestamp}>{comment?.createdAt?.seconds ? dayjs.unix(comment?.createdAt?.seconds).fromNow(true) : dayjs(comment?.createdAt).fromNow()}</Text>
                </View>
                <Text style={styles.reckon}>{comment?.message}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    commentWrapper: {
        padding:10,
        flexDirection:"row",
        alignItems:"center"
    },

    comment: {
        backgroundColor:"#f0f0f0",
        padding:10,
        borderRadius:12,
        flex:1,
        overflow:"hidden"
    },

    propicSmall: {
        width:40,
        height:40,
        borderRadius:20,
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
        justifyContent:"space-between",
        flex:1
    },

    reckonOwner: {
        color:"#444",
        fontFamily: 'Open-Sans-Bold',
        textTransform:"capitalize",
        width:"70%"
    },

    timestamp: {
        color:"grey",
        fontSize:12,
        fontFamily: 'Open-Sans',
        textAlign:"right"
    },

    reckon: {
        color:"#444",
        paddingVertical:8,
        fontFamily: 'Open-Sans'
    }
})
