import React from 'react'
import { View, StyleSheet } from 'react-native'
import Register from '../components/Register'

export default function AuthScreen(){
    return (
        <View style={styles.container}>
            <Register />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})
