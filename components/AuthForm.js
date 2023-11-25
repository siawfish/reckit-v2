import React from 'react'
import { StyleSheet, Platform, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import SignupForm from './SignupForm'

export default function AuthForm({
    onCancel,
    gotoLogin,
    navigation
}){
    return (
        <View style={styles.modalContainer}>
            <LinearGradient
                colors={['transparent', '#f7702d']}
                style={styles.gradientView}
                start={{ 
                    x: 0.02, 
                    y: 1
                }}
                end={{
                    x: 1, 
                    y: 0.02
                }}
            >
                <SignupForm navigation={navigation} gotoLogin={gotoLogin} onCancel={onCancel} />
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    gradientView: {
        flex:1,
        paddingTop:Platform.OS==="ios"?"10%":null
    },

    modalContainer: {
        backgroundColor:"#7536ad",
        flex:1
    }
})
