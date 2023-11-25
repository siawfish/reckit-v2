import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default function NextButton({
    onPress,
    disabled
}) {
    return (
        <TouchableOpacity 
            disabled={disabled} 
            onPress={onPress} 
            style={[
                    styles.nextBtn, 
                    disabled&&styles.disabled
                ]}
            >
            <Text style={styles.btnText}>Next</Text>
            <MaterialIcons name="navigate-next" size={24} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    nextBtn: {
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:30,
        backgroundColor:"#ffa300",
        alignSelf:"flex-end",
        paddingVertical:10,
        borderRadius:25,
        justifyContent:"center",
        marginVertical:20
    },

    disabled: {
        opacity:0.5
    },

    btnText: {
        color:"white",
        fontSize:16,
        marginLeft:5,
        textAlign:"center",
        fontFamily: 'Open-Sans-Bold'
    }
})
