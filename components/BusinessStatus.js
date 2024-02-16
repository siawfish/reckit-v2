import React from 'react'
import { StyleSheet, View } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function BusinessStatus({
    status,
    onPress
}) {
    return (
        <View style={styles.inputWrapper}>
            <View style={styles.radioWrapper}>
                <BouncyCheckbox
                    size={20}
                    isChecked={status?.toString()==='1'?true:false}
                    fillColor="#7536ad"
                    unfillColor="#f0f0f0"
                    text="Published"
                    iconStyle={{ borderColor: "#7536ad" }}
                    textStyle={styles.label}
                    onPress={()=>onPress("published", 1)}
                    disableBuiltInState
                />
            </View>
            <View style={[styles.radioWrapper, {marginLeft:30}]}>
                <BouncyCheckbox
                    size={20}
                    isChecked={status?.toString()==='0'?true:false}
                    fillColor="#7536ad"
                    unfillColor="#f0f0f0"
                    text="Unpublished"
                    iconStyle={{ borderColor: "#7536ad" }}
                    textStyle={styles.label}
                    onPress={()=>onPress("published", 0)}
                    disableBuiltInState
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection:"row",
        alignItems:"center"
    },

    radioWrapper: {
        flexDirection:"row",
        alignItems:"center"
    },

    label: {
        fontFamily: 'Open-Sans',
        textDecorationLine: "none",
    },


})
