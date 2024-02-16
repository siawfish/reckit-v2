import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import propic from '../assets/propic.jpeg'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { Toast } from 'native-base'
import { API } from '../utils/confiq'

export default function Question({
    item,
    toggleShowComment=()=>null,
    commentsCount,
    onDeleteComplete
}) {
    const [isDeleting, setIsDeleting] = useState(false);
    const { authToken, profile } = useSelector(state=>state.app)
    const onDelete = ()=> {
        // confirm alert
        Alert.alert(
            "Delete Reckit",
            "Are you sure you want to delete this Reckit?",
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
            const { ok, data, problem } = await API.delete(`/reckits/${item?.id}`)
            if(ok){
                setIsDeleting(false)
                onDeleteComplete()
                Toast.show({
                    text:"Reckit successfully deleted!",
                    duration: 5000,
                    position: "bottom",
                    type: "success"
                })
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
        }
    }

    return (
        <View style={styles.reckonWrapper}>
            <Image style={styles.propic} source={item?.author?.avatar ? {uri:item?.author?.avatar} : propic} />
            <View style={styles.reckonInfo}>
                <View style={styles.reckonOwnerRow}>
                    <Text numberOfLines={1} style={styles.reckonOwner}>{item?.author?.displayName}</Text>
                    <View style={styles.dot}></View>
                    <Text style={styles.timestamp}>{item?.createdAt?.seconds ? dayjs.unix(item?.createdAt?.seconds).fromNow(true) : dayjs(item?.createdAt).fromNow(true) }</Text>
                </View>
                <Text style={styles.reckon}>{item?.message}</Text>
                <View style={styles.reckonStatWrapper}>
                    {
                        profile?.id === item?.author?.id &&
                        <TouchableOpacity disabled={isDeleting} style={styles.btn} onPress={onDelete}>
                            <AntDesign name="delete" size={20} color="#FF0000" />
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.btn} onPress={toggleShowComment}>
                        <MaterialCommunityIcons name="comment" size={20} color="#7536ad" />
                        <Text style={styles.reckonStat}>{commentsCount}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    reckonWrapper: {
        paddingVertical:10,
        flexDirection:"row",
        backgroundColor:"#fff",
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
        flex:1,
        justifyContent:"space-between"
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
        alignSelf:"flex-end",
        gap:10
    },

    btn: {
        flexDirection:"row",
        alignItems:"center"
    
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
