import { Text, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SubmitButton from '../components/SubmitButton';
import CancelButton from '../components/CancelButton';
import { LinearGradient } from 'expo-linear-gradient'
import InputFields from '../components/InputFields';
import { API } from '../utils/confiq';
import { Toast } from 'native-base';

export default function ForgotPassword({navigation}) {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")

    const onSubmit = async ()=> {
        try {
            setIsLoading(true)
            const { ok, data, problem } = await API.get(`/request-change-password/${email}`)
            if(ok){
                setIsLoading(false)
                setEmail("")
                Toast.show({
                    text: "Password reset link has been sent to your email.",
                    buttonText: "Okay",
                    type: "success",
                    duration: 3000,
                    position: "top"
                })
            }else{
                throw new Error(data?.error??data?.message??problem)
            }
        } catch (error) {
            setIsLoading(false)
            Toast.show({
                text: error.message,
                buttonText: "Okay",
                type: "danger",
                duration: 3000,
                position: "top"
            })
        }
    }

    return (
        <KeyboardAwareScrollView bounces={false} contentContainerStyle={styles.loginForm}>
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
                <View style={styles.wrapper}>
                    <CancelButton style={styles.cancelBtn} onPress={()=>navigation.goBack()} />
                    <Text style={styles.loginTitle}>Confirm your email address</Text>
                    <View style={styles.underline}></View>
                    <Text style={styles.caption}>A password reset link will be sent to your email address, where you can be able to change your password.</Text>
                    <Text style={styles.label}>Email</Text>
                    <InputFields 
                        defaultValue={email}
                        onChangeText={(text)=>setEmail(text)} 
                        style={styles.input} 
                        placeholder="Your email address" 
                        clear={()=>setEmail('')}
                    />
                    <SubmitButton 
                        onPress={onSubmit}
                        isLoading={isLoading}
                        disabled={!email||isLoading}
                        label="Reset Password" 
                    />
                </View>
            </LinearGradient>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    gradientView: {
        flex:1,
        paddingTop:Platform.OS==="ios"?"10%":null
    },

    loginTitle: {
        fontSize:25,
        width:"60%",
        color:"white",
        paddingTop:"15%",
        fontFamily: 'Open-Sans-Bold'
    },

    wrapper: {
        paddingHorizontal:20,
        flex:1
    },

    loginForm: {
        backgroundColor:"#7536ad",
        flex:1
    },

    underline: {
        width:40,
        height:4,
        backgroundColor:"#ffa300",
        marginVertical:20
    },

    label: {
        color:"white",
        fontSize:15,
        paddingVertical:10,
        fontFamily: 'Open-Sans-Bold'
    },

    input: {
        paddingHorizontal:10
    },

    cancelBtn: {
        position:"absolute",
        right:0,
        top:20
    },

    err: {
        color:"#ff7961",
        textAlign:"center"
    },

    caption: {
        color:"#fff",
        opacity:0.8,
        fontFamily: 'Open-Sans',
        textAlign:"center"
    }
});
