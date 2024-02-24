import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import CategoryIcon from './CategoryIcon'

export default function CategoryRow({
    onPress,
    type,
    item
}){
    return (
        <TouchableOpacity onPress={onPress} style={styles.categoryWrapper}>
            <CategoryIcon type={type} />
            <Text style={styles.label}>{item?.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    categoryWrapper: {
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:15,
        borderBottomColor:"#e0e0e0",
        borderBottomWidth:1,
        paddingVertical:10
    },

    label: {
        marginHorizontal:10,
        fontFamily: 'Open-Sans'
    }
})
