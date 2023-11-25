import React from 'react'
import { Text, StyleSheet, View, Image, SafeAreaView, Dimensions, TouchableOpacity, Platform, Modal, Alert } from 'react-native'
import { BlurView } from 'expo-blur'
import loginBg from '../assets/loginVector.png'
import facebookBtn from '../assets/ic_button_facebook.png'
import googleBtn from '../assets/ic_button_google.png'
import { AntDesign } from '@expo/vector-icons';
import BackButton from './BackButton'
import SocialButton from './SocialButton'

const windowHeight = Dimensions.get('window').height

export default function SignupOptions({
    navigation,
    onSignupByFacebook,
    onSignupByGoogle,
    onSignup
}){
    return (
        <BlurView tint="dark" intensity={100} style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}>
            <SafeAreaView>
                <View style={styles.topRow}>
                    <BackButton onPress={()=>navigation.goBack()} color="#ffffff" />
                    <Text style={styles.title}>Enjoy all features</Text>
                </View>
                
                <View style={styles.whiteBoard}>
                    <View style={styles.loginBgWrapper}>
                        <Image source={loginBg} style={styles.loginBg} />
                    </View>
                    <Text style={styles.whiteBoardText}>Already have a social media account? You are one step away to the full RECKIT experience</Text>
                    <SocialButton 
                        containerStyle={{backgroundColor:"#3b5998"}}
                        icon={<AntDesign name="facebook-square" size={24} color="white" />}
                        btnText="Signup with Facebook"
                        btnTextStyle={{color:"#fff"}}
                        onPress={onSignupByFacebook}
                    />
                    <SocialButton 
                        containerStyle={{backgroundColor:"#fff"}}
                        icon={<AntDesign name="google" size={24} color="black" />}
                        btnText="Signup with Google"
                        btnTextStyle={{color:"#000"}}
                        onPress={onSignupByGoogle}
                    />
                    <SocialButton 
                        onPress={onSignup}
                    />
                </View>
                <View style={styles.termsWrapper}>
                    <Text style={styles.terms}>By using Reckit, you agree to the</Text>
                    <TouchableOpacity style={styles.link} onPress={()=>navigation.navigate("Terms Of Service")}>
                        <Text style={styles.coloredText}>Terms</Text>
                    </TouchableOpacity>
                    <Text style={styles.terms}>and</Text>
                    <TouchableOpacity style={styles.link} onPress={()=>navigation.navigate("Privacy Policy")}>
                        <Text style={styles.coloredText}>Privacy</Text>
                    </TouchableOpacity>
                    <Text style={styles.terms}>policy.</Text>
                </View>
            </SafeAreaView>
        </BlurView>
    )
}

const styles = StyleSheet.create({
    title: {
        color:"#fff",
        fontSize:18,
        paddingVertical:15,
        fontFamily: 'Open-Sans'
    },

    nonBlurredContent: {
        padding:20
    },

    whiteBoard: {
        backgroundColor:"#f0f0f0",
        height:windowHeight/1.5,
        borderRadius:4,
        alignItems:"center",
        paddingVertical:Platform.OS==="android"? "8%":"15%"
    },

    termsWrapper: {
        flexDirection:"row",
        justifyContent:"center",
        paddingVertical:20
    },

    terms: {
        color:"#fff",
        textAlign:"center",
        fontFamily: 'Open-Sans'
    },

    link: {
        paddingHorizontal:5
    },

    underline: {
        textDecorationLine:'underline'
    },

    loginBgWrapper: {
        width:"80%",
        height:"35%",
        marginVertical:10
    },

    loginBg: {
        width:"100%",
        height:"100%"
    },

    whiteBoardText: {
        width:"75%",
        textAlign:"center",
        paddingVertical:10,
        fontFamily: 'Open-Sans'
    },

    socialBtn: {
        width:"60%",
        height:"10%",
        marginVertical:10
    },

    socialBtnImage: {
        width:"100%",
        height:"100%"
    },

    googleBtn: {
        padding:5,
        backgroundColor:"#fff",
        borderRadius:4
    },

    emailBtnText: {
        fontSize:15,
        color:"#fff",
        paddingHorizontal:10,
        fontFamily: 'Open-Sans-Bold'
    },

    emailBtn: {
        backgroundColor:"#7536ad",
        borderRadius:4,
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:15
    },

    coloredText: {
        color:"#ffa300",
        textDecorationLine:"underline",
        fontFamily: 'Open-Sans'
    },

    topRow: {
        flexDirection:"row",
        justifyContent:"space-between"
    }
})