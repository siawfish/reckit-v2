import React from 'react'
import { StyleSheet, View } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function OpenStatus({
    status,
    onChange
}) {
    return (
        <>
            <View style={styles.radioWrapper}>
                <BouncyCheckbox
                    size={15}
                    isChecked={status===1?true:false}
                    fillColor="green"
                    unfillColor="#f0f0f0"
                    text="Open"
                    iconStyle={{ borderColor: "#7536ad" }}
                    textStyle={styles.label}
                    onPress={()=>onChange("status",1)}
                    disableBuiltInState
                />
            </View>
            <View style={[styles.radioWrapper, {marginLeft:30}]}>
                <BouncyCheckbox
                    size={15}
                    isChecked={status===0?true:false}
                    fillColor="red"
                    unfillColor="#f0f0f0"
                    text="Close"
                    iconStyle={{ borderColor: "#7536ad" }}
                    textStyle={styles.label}
                    onPress={()=>onChange("status",0)}
                    disableBuiltInState
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Open-Sans',
        fontSize: 14,
        textDecorationLine: "none",
    },

    radioWrapper: {
        flexDirection:"row",
        alignItems:"center"
    }
})
