import React from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import img from '../assets/asset1.png'
import CancelButton from './CancelButton'

export default function EnablePermission({
    onPress,
    title="We can't find your location!",
    caption="Please turn on your location to see all attractions near you.",
    label="Turn on location",
    onCancel
}){
    return (
        <View style={styles.view}>
            {
                onCancel &&
                <CancelButton 
                    onPress={onCancel} 
                    btnText={{color:"#7536ad"}} 
                    iconColor='#7536ad' 
                    style={styles.cancelBtn} 
                />
            }
            <View style={styles.noLocationContainer}>
                <Image source={img} style={styles.img} />
                <Text style={styles.caption}>{title}</Text>
                <Text style={styles.ins}>{caption}</Text>
                <TouchableOpacity onPress={onPress} style={styles.btn}>
                    <Text style={styles.btnText}>{label}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    noLocationContainer: {
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },

    img: {
        width:82,
        height:94
    },

    caption: {
        color:"#7536ad",
        paddingVertical:15,
        fontSize:18,
        textAlign:"center",
        fontFamily: 'Open-Sans-Bold'
    },

    ins: {
        textAlign:"center",
        width:"60%",
        marginBottom:15,
        fontFamily: 'Open-Sans'
    },

    btn: {
        borderWidth:2,
        borderColor:"#7536ad",
        borderRadius:25,
        paddingHorizontal:20,
        paddingVertical:10
    },

    btnText: {
        color:"#7536ad",
        fontFamily: 'Open-Sans'
    },

    cancelBtn: {
        position:"absolute",
        right:0,
        top:20
    },

    view: {
        flex:1, 
        paddingHorizontal:15, 
        paddingVertical:20
    }
})
