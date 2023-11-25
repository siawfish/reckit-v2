import React from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function PasswordField({
    defaultValue,
    onPasswordChange,
}) {

    const [isSecure, setIsSecure] = React.useState(true)

    const toggleSecureTextEntry = () => {
        setIsSecure(!isSecure)
    }

    return (
        <View style={styles.wrapper}>
            <TextInput 
                defaultValue={defaultValue} 
                onChangeText={(text)=>onPasswordChange(text)} 
                style={[styles.input]} 
                secureTextEntry={isSecure} 
            />
            <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.iconContainer}>
                <MaterialCommunityIcons name={!isSecure?"eye-off":"eye"} size={20} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 13,
        marginBottom: 10,
        color:"#3E4958",
        fontFamily:'Open-Sans-Bold'
    },

    wrapper: {
        borderRadius:6,
        backgroundColor:"#fff",
        height:40,
        borderBottomWidth:0
    },

    input: {
        flex:1,
        fontSize:15,
        fontFamily: 'Open-Sans',
        paddingHorizontal:10,
        direction: "ltr",
        textAlign: "left"
    },

    iconContainer:{
        position:"absolute",
        bottom:8,
        right:8
    }
})
