import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons'
import { Toast } from 'native-base'
import { API } from '../utils/confiq'

export default function Business({
    navigation,
    item
}) {
    const [reviewsCount, setReviewCount] = React.useState(0)
    
    React.useEffect(()=>{
        getReviews()
    },[])

    const getReviews = async ()=> {
        try {
            const { ok, data, problem } = await API.get('/reviews/'+item?.id)
            if(ok){
                setReviewCount(data.length)
            } else {
                Toast.show({
                    text:data.error||problem,
                    duration: 5000,
                    position: "top",
                    type: "danger"
                })
            }
        } catch (error) {
            Toast.show({
                text:error.message,
                duration: 5000,
                position: "top",
                type: "danger"
            })
        }
    }

    const gotoDetails = ()=> {
        navigation.navigate("Business Details", {
            bid:item?.id,
        })
    }

    const gotoEditBusiness = ()=> {
        navigation.navigate("Edit Business",{bid:item?.id})
    }

    return (
        <TouchableOpacity onPress={gotoDetails} style={styles.listingWrapper}>
            <View style={styles.imageWrapper}>
                {
                    item?.photos ?
                    <Image style={styles.img} source={{uri:item?.photos[0]}} /> :
                    <Ionicons name="ios-images" size={24} color="white" />
                }
                <TouchableOpacity onPress={gotoEditBusiness} style={styles.editBtn}>
                    <Entypo name="edit" size={15} color="white" />
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.descRow}>
                <View style={styles.descWrapper}>
                    <Text style={styles.businessName}>{item?.name}</Text>
                    <Text style={styles.category}>{item?.category}</Text>
                </View>
                <Text style={styles.review}>{reviewsCount} Review</Text>
            </View>
            <View style={styles.descRow}>
                <View style={styles.locationWrapper}>
                    <View style={styles.locationIcon}>
                        <MaterialIcons name="location-on" size={24} color="black" />
                    </View>
                    <Text>{item?.address}</Text>
                </View>
                <View style={styles.statusWrapper}>
                    <View style={[styles.dot, item?.published && styles.active]}></View>
                    <Text style={[styles.status, item?.published && styles.activeText]}>{item?.published===1 ? "Active" : "Inactive"}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listingWrapper: {
        height:220,
        width:"100%",
        backgroundColor:"#fff",
        marginVertical:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:4
    },

    imageWrapper: {
        backgroundColor:"#cfcfcf",
        height:"50%",
        justifyContent:"center",
        alignItems:"center",
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
    },

    img: {
        width:"100%",
        height:"100%",
        borderTopLeftRadius:4,
        borderTopRightRadius:4
    },

    editBtn: {
        position:"absolute",
        top:10,
        right:10,
        fontFamily: 'Open-Sans-Bold'
    },

    editText: {
        fontSize:12,
        color:"white",
        fontFamily: 'Open-Sans'
    },

    descRow: {
        flexDirection:"row",
        justifyContent:"space-between",
        padding:10
    },

    businessName: {
        paddingVertical:5,
        color:"#7536ad",
        fontFamily: 'Open-Sans-Bold'
    },

    category: {
        color:"#ffa300",
        fontSize:12,
        fontFamily: 'Open-Sans-Bold'
    },

    review: {
        fontFamily: 'Open-Sans-Bold'
    },

    dot: {
        width:8,
        height:8,
        borderRadius:4,
        backgroundColor:"red",
        marginRight:5
    },

    statusWrapper: {
        flexDirection:"row",
        alignItems:"center"
    },

    status: {
        color:"red",
        fontFamily: 'Open-Sans-Bold'
    },

    active: {
        backgroundColor:"#76a803"
    },

    activeText: {
        color:"#76a803"

    },

    locationWrapper: {
        flexDirection:"row",
        alignItems:"center"
    }
})
