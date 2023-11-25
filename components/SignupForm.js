import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import InputFields from './InputFields'
import PasswordField from './PasswordField'
import SubmitButton from './SubmitButton'
import CancelButton from './CancelButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { API } from '../utils/confiq'

export default function SignupForm({
    gotoLogin,
    onCancel
}) {
    const [user, setUser] = React.useState({
        fullName:"",
        email:"",
        password:"",
        conPassword:""
    })
    const [err, setErr] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    const validate = ()=> {
        if(!user.fullName.match(/^[a-z ,.'-]+$/i)){
            setErr("Kindly enter your full name.")
            return false
        }
        if(!user.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            setErr("Kindly enter a valid email.")
            return false
        }
        if(user.password.length<6){
            setErr("Password should not be less than 6 characters.")
            return false
        }
        if(user.password!==user.conPassword){
            setErr("Passwords do not match.")
            return false
        }
        return true
    }

    const onChangeText = (name, text)=> {
        setErr("")
        setUser({
            ...user,
            [name]:text
        })
    }

    const onClear = (name)=>{
        setUser({
            ...user,
            [name]:""
        })
    }

    const agreeTerms = ()=> {
        setErr("")
        if(!validate()){
            setIsLoading(false)
            return
        }
        Alert.alert(
            'Terms and Conditions',
            'By clicking on the "Sign Up" button, you agree to our Terms and Conditions.',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'I Agree', onPress: () => onSubmit()},
            ],
            {cancelable:false}
        )
    }

    const onSubmit = async ()=> {
        try {
            setIsLoading(true)
            const creds = {
                firstName:user.fullName.split(' ').slice(0, -1).join(' '),
                lastName:user.fullName.split(' ').slice(-1).join(' '),
                otherNames:user.fullName.split(' ').slice(1, -1).join(' '),
                email:user.email,
                password:user.password
            }
            const { ok, data } = await API.post("/register", creds)
            if(ok){
                setIsLoading(false)
                Alert.alert(
                    "Success",
                    "You have successfully registered. Please login to continue.",
                    [
                        {
                          text: "Login",
                          onPress: () => gotoLogin()
                        }
                    ],
                    { cancelable: true }
                )
            } else {
                throw new Error(data?.error)
            }
        } catch (error) {
            setErr(error.message)
            setIsLoading(false)
        }        
    }

    return (
        <KeyboardAwareScrollView bounces={false} style={styles.loginForm}>
            <CancelButton style={styles.cancelBtn} onPress={onCancel} />
            <Text style={styles.loginTitle}>Complete the form to signup</Text>
            <View style={styles.underline}></View>
            <Text style={styles.err}>{err}</Text>
            <Text style={styles.label}>Full Name</Text>
            <InputFields 
                defaultValue={user.fullName} 
                onChangeText={(text)=>onChangeText("fullName", text)} 
                style={styles.input} 
                placeholder="Your full name" 
                clear={()=>onClear("fullName")}
            />
            <Text style={styles.label}>Email</Text>
            <InputFields 
                defaultValue={user.email} 
                onChangeText={(text)=>onChangeText("email", text)} 
                style={styles.input} 
                placeholder="Your email" 
                clear={()=>onClear("email")}
            />
            <Text style={styles.label}>Password</Text>
            <PasswordField 
                defaultValue={user.password} 
                onPasswordChange={(text)=>onChangeText("password", text)} 
                style={styles.input} 
            />
            <Text style={styles.label}>Confirm Password</Text>
            <PasswordField 
                defaultValue={user.conPassword} 
                onPasswordChange={(text)=>onChangeText("conPassword", text)} 
            />
            <SubmitButton 
                disabled={isLoading} 
                isLoading={isLoading} 
                onPress={agreeTerms} 
                label="Sign Up" 
            />
            <View style={styles.linksWrapper}>
                <Text style={styles.link}>Already have an account? Log in</Text>
                <TouchableOpacity onPress={gotoLogin}>
                    <Text style={styles.coloredText}>here!</Text>
                </TouchableOpacity>
            </View>
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
        paddingHorizontal:20
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

    link: {
        color:"#fff",
        textAlign:"center",
        fontFamily: 'Open-Sans'
    },

    linksWrapper: {
        paddingVertical:20,
        flexDirection:"row",
        justifyContent:"center"
    },

    coloredText: {
        color:"#ffa300",
        textDecorationLine:"underline",
        fontFamily: 'Open-Sans',
        paddingHorizontal:5
    },

    cancelBtn: {
        position:"absolute",
        right:0,
        top:20
    },

    err: {
        color:"#ff7961",
        textAlign:"center"
    }
})
