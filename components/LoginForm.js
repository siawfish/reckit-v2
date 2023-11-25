import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import InputFields from './InputFields'
import PasswordField from './PasswordField'
import SubmitButton from './SubmitButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearGradient } from 'expo-linear-gradient'
import { Toast } from 'native-base'
import { API } from '../utils/confiq'
import { setAuthToken, setUserProfile, setIsAuthenticated } from '../redux/appStore'
import { useDispatch } from 'react-redux'

export default function LoginForm({
    navigation,
    route
}) {
    const action = route?.params?.type
    const dispatch = useDispatch()
    const [loginDetails, setLoginDetails] = React.useState({
        email:"",
        password:""
    })
    const [isLoading, setIsLoading] = React.useState(false)
    const onChange = (name,text)=> {
        setLoginDetails({
            ...loginDetails,
            [name]:text
        })
    }

    React.useEffect(()=>{
        if(action){
            gotoRegisterOptions()
        }
    },[action])

    const gotoRegisterOptions = ()=> {
        navigation.navigate('Signup Options')
    }

    const gotoForgottenPassword = ()=> {
        navigation.navigate('Forgot Password')
    }

    const onClear = (name)=> {
        setLoginDetails({
            ...loginDetails,
            [name]:""
        })
    }

    const onLogin = async ()=> {
        try {
            setIsLoading(true)
            const { ok, data } = await API.post('/login', loginDetails)
            if(ok){
                dispatch(setAuthToken(data.token))
                dispatch(setUserProfile(data.user))
                setIsLoading(false)
                dispatch(setIsAuthenticated(true))
                navigation.navigate('Tabs', {
                    screen:"Profile"
                })
            } else {
                Toast.show({
                    text:data.error,
                    duration: 5000,
                    position: "top",
                    type: "danger"
                })
                setIsLoading(false)
            }
        } catch (error) {
            Toast.show({
                text:error.message,
                duration: 5000,
                position: "top",
                type: "danger"
            })
            setIsLoading(false)
        }
    }
    return (
        <KeyboardAwareScrollView bounces={false} style={styles.loginForm}>
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
                <Text style={styles.loginTitle}>Login with your email address</Text>
                <View style={styles.underline}></View>
                <Text style={styles.label}>Email</Text>
                <InputFields 
                    defaultValue={loginDetails.email} 
                    onChangeText={(text)=>onChange("email", text)} 
                    style={styles.input} 
                    placeholder="Your email address" 
                    clear={()=>onClear('email')}
                />
                <Text style={styles.label}>Password</Text>
                <PasswordField defaultValue={loginDetails.password} onPasswordChange={(text)=>onChange("password", text)} />
                <TouchableOpacity onPress={gotoForgottenPassword}>
                    <Text style={[styles.coloredText, {marginTop:10}]}>Forgotten password?</Text>
                </TouchableOpacity>
                <SubmitButton disabled={loginDetails.email===''||loginDetails.password===''} isLoading={isLoading} onPress={onLogin} label="Log In" />
                <View style={styles.linkWrapper}>
                    <Text style={styles.link}>Don't have an account? Create one</Text>
                    <Text onPress={gotoRegisterOptions} style={styles.coloredText}>here!</Text>
                </View>
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
        backgroundColor:"#7536ad",
        direction: "ltr"
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

    linkWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop:20,
        justifyContent: "center"
    },

    link: {
        color:"#fff",
        textAlign:"center",
        fontFamily: 'Open-Sans',
        marginRight: 3
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
        paddingHorizontal:20
    },

    input: {
        direction: "ltr"
    },

    err: {
        color:"#ff7961",
        textAlign:"center"
    }
})
