import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default function SocialButton({
    onPress,
    btnText="Signup with Email",
    containerStyle,
    icon,
    btnTextStyle
}){
    return (
        <TouchableOpacity onPress={onPress} style={[styles.socialBtn, styles.emailBtn, containerStyle]} >
            {
                icon ?? <MaterialIcons name="email" size={24} color="white" />
            }
            <Text style={[styles.emailBtnText, btnTextStyle]} >{btnText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    socialBtn: {
        width:"60%",
        height:"10%",
        marginVertical:10
    },

    emailBtn: {
        backgroundColor:"#7536ad",
        borderRadius:4,
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:15
    },

    emailBtnText: {
        fontSize:15,
        color:"#fff",
        paddingHorizontal:10,
        fontFamily: 'Open-Sans-Bold'
    }
})
