import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import InputFields from './InputFields'
import PasswordField from './PasswordField'
import SubmitButton from './SubmitButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearGradient } from 'expo-linear-gradient'
import CancelButton from './CancelButton'

export default function CreatePassword({
    user,
    onSubmit,
    onCancel
}) {
    const [password, setPassword] = React.useState("")
    const [conPassword, setConPassword] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [err, setErr] = React.useState("")
    const onPress = async ()=> {
        setIsLoading(true)
        if(password.length<6){
            setErr("Password should not be less than 6 characters.")
            setIsLoading(false)
            return
        }
        if(password!==conPassword){
            setErr("Passwords do not match.")
            setIsLoading(false)
            return
        }
        
        setIsLoading(false)
        onSubmit(password)
        onCancel()
    }
    return (
        <KeyboardAwareScrollView style={styles.loginForm}>
            <LinearGradient
                colors={['transparent', '#f7702d']}
                style={styles.gradientView}
                start={{ 
                    x: 0.02, 
                    y: 1
                }}
                end={{
                    x: 0.02, 
                    y: 0.02
                }}
            >
                <CancelButton onPress={onCancel} />
                <Text style={styles.loginTitle}>Hello {user.firstName}, create a password to complete signup.</Text>
                <View style={styles.underline}></View>
                <Text style={styles.err}>{err}</Text>
                <Text style={styles.label}>Password</Text>
                <PasswordField defaultValue={password} onPasswordChange={setPassword} />
                <Text style={styles.label}>Confirm Password</Text>
                <PasswordField defaultValue={conPassword} onPasswordChange={setConPassword} />
                <SubmitButton disabled={isLoading} isLoading={isLoading} onPress={onPress} label="Submit" />
            </LinearGradient>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    loginTitle: {
        fontSize:25,
        width:"60%",
        color:"white",
        paddingTop:"15%",
        fontFamily: 'Open-Sans-Bold'
    },

    loginForm: {
        flex:1,
        backgroundColor:"#7536ad"
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

    link: {
        color:"#fff",
        paddingVertical:20,
        textAlign:"center",
        fontFamily: 'Open-Sans'
    },

    coloredText: {
        color:"#ffa300",
        textDecorationLine:"underline",
        fontFamily: 'Open-Sans'
    },

    cancelBtn: {
        position:"absolute",
        right:0,
        top:20
    },

    gradientView: {
        flex:1,
        paddingTop:Platform.OS==="ios"?"10%":null,
        paddingHorizontal:20,
        paddingTop:20
    },

    err: {
        color:"#ff7961",
        textAlign:"center"
    }
})
