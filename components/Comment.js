import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import propic from '../assets/propic.jpeg'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { Toast } from 'native-base'
import { API } from '../utils/confiq'

export default function Comment({
    comment,
    onDeleteComplete,
    onClose
}) {
    const [isDeleting, setIsDeleting] = useState(false);
    const { authToken, profile } = useSelector(state=>state.app)
    const onDelete = ()=> {
        // confirm alert
        Alert.alert(
            "Delete Reply",
            "Are you sure you want to delete this reply?",
            [
                {
                    text:"Cancel",
                    style:"cancel"
                },
                {
                    text:"Delete",
                    style:"destructive",
                    onPress: () => onConfirmDelete()
                }
            ]
        )
    }

    const onConfirmDelete = async()=> {
        try {
            setIsDeleting(true)
            API.setHeader('Authorization', `Bearer ${authToken}`)
            const { ok, data, problem } = await API.delete(`/reply/${comment?.id}`)
            if(ok){
                setIsDeleting(false)
                onDeleteComplete()
                Toast.show({
                    text:"Reply successfully deleted!",
                    duration: 5000,
                    position: "bottom",
                    type: "success"
                })
                onClose()
                return;
            }
            throw new Error(data?.error||problem)
        } catch (error) {
            setIsDeleting(false)
            Toast.show({
                text:error.message,
                duration: 5000,
                position: "top",
                type: "danger"
            })
            onClose()
        }
    }
    return (
        <View style={[styles.commentWrapper, {alignItems:"flex-start", borderBottomColor:"#f0f0f0", borderBottomWidth:1}]}>
            <Image style={styles.propicSmall} source={comment?.author?.avatar ? {uri:comment?.author?.avatar} : propic} />
            <View style={styles.comment}>
                <View style={styles.reckonOwnerRow}>
                    <Text numberOfLines={1} style={styles.reckonOwner}>{comment?.author?.displayName}</Text>
                    <View style={styles.dot}></View>
                    <Text style={styles.timestamp}>{comment?.createdAt?.seconds ? dayjs.unix(comment?.createdAt?.seconds).fromNow(true) : dayjs(comment?.createdAt).fromNow(true)}</Text>
                </View>
                <Text style={styles.reckon}>{comment?.message}</Text>
                <View style={styles.deleteWrapper}>
                    {
                        profile?.id === comment?.author?.id &&
                        <TouchableOpacity disabled={isDeleting} onPress={onDelete}>
                            <AntDesign name="delete" size={20} color="#FF0000" />
                        </TouchableOpacity>
                    }
                </View>
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

    deleteWrapper: {
        flexDirection:"row",
        justifyContent:"flex-end",
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
