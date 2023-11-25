import React, { useEffect } from 'react'
import AddBusiness from '../screens/AddBusiness'
import Business from '../screens/Business'
import { View, Alert, Image, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './MainNavigation'
import { createStackNavigator } from '@react-navigation/stack'
import SearchScreen from '../screens/SearchScreen'
import Settings from '../screens/Settings'
import FAQ from '../screens/FAQ'
import About from '../screens/About'
import PrivacyPolicy from '../screens/PrivacyPolicy'
import TermsOfService from '../screens/TermsOfService'
import EditBusiness from '../screens/EditBusiness'
import { LinearGradient } from 'expo-linear-gradient'
import { Root } from 'native-base'
import * as Font from 'expo-font'
import Welcome from '../screens/Welcome'
import Register from '../components/Register'
import { useSelector, useDispatch } from 'react-redux'
import * as Location from 'expo-location'
import { setLocation, setLocationPermission } from '../redux/appStore'
import EditProfile from '../screens/EditProfile'
import ForgotPassword from '../screens/ForgotPassword'
import logo from '../assets/icon.png'
import * as Animatable from 'react-native-animatable';

const Stack = createStackNavigator()

const pulse = {
    0: {
        scale: 1,
    },
    0.5: {
        scale: 1.3,
    },
    1: {
        scale: 1,
    }
}

export default function StackNavigation() {
    const [isLoading, setIsLoading] = React.useState(true)
    const { isAuthenticated, showOnboarding } = useSelector(state => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        initialRender()
    }, [])

    const initialRender = async () => {
        await loadFont()
        await getPermissionStatus()
    }

    const loadFont = async () => {
        try {
            await Font.loadAsync({
                'Open-Sans': require('../assets/fonts/Open_Sans/OpenSans-Light.ttf'),
                'Open-Sans-Bold':  require('../assets/fonts/Open_Sans/OpenSans-SemiBold.ttf')
            })
        } catch (error) {
            console.log(error)
        }
    }

    const requestPermission = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if(status==="granted"){
                dispatch(setLocationPermission(true))
                await getLocation()
            } else {
                dispatch(setLocationPermission(false))
            }
            setIsLoading(false)
        } catch (error) {
            Alert.alert(error.message)
            setIsLoading(false)
        }
    }

    const getPermissionStatus = async () => {
        try {
            const { status } = await Location.getForegroundPermissionsAsync()
            if(status==="granted"){
                dispatch(setLocationPermission(true))
                await getLocation()
            } else {
                await requestPermission()
            }
        } catch (error) {
            console.log(e)
        }
    }

    const getLocation = async()=> {
        try {
            const { coords } = await Location.getCurrentPositionAsync()
            dispatch(
                setLocation({
                    lat:coords.latitude,
                    lon:coords.longitude
                })
            )
            setIsLoading(false)
        } catch (error) {
            Alert.alert(error.message)
            setIsLoading(false)
        }
    }

    if(isLoading){
        return (
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <Animatable.Image iterationCount='infinite' iterationDelay={1000} animation={pulse} style={{width:100, height:100, marginBottom:20}} source={logo} />
                <Text style={{fontSize:13, color:"#999999"}}>Initializing app...</Text>
            </View>
        )
    }

    return (
        <Root>
            <View style={{flex:1, direction:"ltr"}}>
                <NavigationContainer>
                    <Stack.Navigator>
                        {
                            isAuthenticated ?

                            <>
                                <Stack.Screen 
                                    name="Tabs" 
                                    children={()=><MainNavigation />}
                                    options={{
                                        headerShown:false
                                    }}
                                />

                                <Stack.Screen 
                                    name="Add Business" 
                                    component={AddBusiness}
                                    options={{
                                        headerShown:false
                                    }}
                                />

                                <Stack.Screen 
                                    name="Edit Business" 
                                    component={EditBusiness}
                                    options={{
                                        headerShown:false
                                    }}
                                />

                                <Stack.Screen 
                                    name="Business Details" 
                                    component={Business}
                                    options={{
                                        headerShown:false
                                    }}
                                />

                                <Stack.Screen 
                                    name="Edit Profile" 
                                    component={EditProfile}
                                    options={{
                                        headerShown:false
                                    }}
                                />
                            
                                <Stack.Screen 
                                    name="Settings" 
                                    component={Settings}
                                    options={{
                                        headerTitle:"",
                                        headerBackTitleStyle: {
                                            color:"#fff"
                                        },
                                        headerTintColor:"#fff",
                                        headerBackground: () => (
                                            <LinearGradient
                                                colors={['#7536ad', '#f7702d']}
                                                style={{flex:1}}
                                                start={{ 
                                                    x: 0.02, 
                                                    y: 1
                                                }}
                                                end={{
                                                    x: 1, 
                                                    y: 0.02
                                                }}
                                            />
                                        ),
                                        headerBackTitle:"My Profile",
                                        headerBackTitleVisible:true
                                    }}
                                />

                                <Stack.Screen 
                                    name="FAQ" 
                                    component={FAQ}
                                    options={{
                                        headerTitle:"",
                                        headerBackTitleStyle: {
                                            color:"#fff"
                                        },
                                        headerTintColor:"#fff",
                                        headerBackground: () => (
                                            <LinearGradient
                                                colors={['#7536ad', '#f7702d']}
                                                style={{flex:1}}
                                                start={{ 
                                                    x: 0.02, 
                                                    y: 1
                                                }}
                                                end={{
                                                    x: 1, 
                                                    y: 0.02
                                                }}
                                            />
                                        ),
                                        headerBackTitle:"Settings",
                                        headerBackTitleVisible:true
                                    }}
                                />

                                <Stack.Screen 
                                    name="About" 
                                    component={About}
                                    options={{
                                        headerTitle:"",
                                        headerBackTitleStyle: {
                                            color:"#fff"
                                        },
                                        headerTintColor:"#fff",
                                        headerBackground: () => (
                                            <LinearGradient
                                                colors={['#7536ad', '#f7702d']}
                                                style={{flex:1}}
                                                start={{ 
                                                    x: 0.02, 
                                                    y: 1
                                                }}
                                                end={{
                                                    x: 1, 
                                                    y: 0.02
                                                }}
                                            />
                                        ),
                                        headerBackTitle:"Settings",
                                        headerBackTitleVisible:true
                                    }}
                                />

                                <Stack.Screen 
                                    name="Terms Of Service" 
                                    component={TermsOfService}
                                    options={{
                                        headerTitle:"",
                                        headerBackTitleStyle: {
                                            color:"#fff"
                                        },
                                        headerTintColor:"#fff",
                                        headerBackground: () => (
                                            <LinearGradient
                                                colors={['#7536ad', '#f7702d']}
                                                style={{flex:1}}
                                                start={{ 
                                                    x: 0.02, 
                                                    y: 1
                                                }}
                                                end={{
                                                    x: 1, 
                                                    y: 0.02
                                                }}
                                            />
                                        ),
                                        headerBackTitle:"Settings",
                                        headerBackTitleVisible:true
                                    }}
                                />

                                <Stack.Screen 
                                    name="Privacy Policy" 
                                    component={PrivacyPolicy}
                                    options={{
                                        headerTitle:"",
                                        headerBackTitleStyle: {
                                            color:"#fff"
                                        },
                                        headerTintColor:"#fff",
                                        headerBackground: () => (
                                            <LinearGradient
                                                colors={['#7536ad', '#f7702d']}
                                                style={{flex:1}}
                                                start={{ 
                                                    x: 0.02, 
                                                    y: 1
                                                }}
                                                end={{
                                                    x: 1, 
                                                    y: 0.02
                                                }}
                                            />
                                        ),
                                        headerBackTitle:"Settings",
                                        headerBackTitleVisible:true
                                    }}
                                />

                                <Stack.Screen 
                                    name="Search" 
                                    component={SearchScreen}
                                    options={{
                                        headerShown:false
                                    }}
                                />
                            </> :
                            <>
                                {
                                    showOnboarding && 
                                    <Stack.Screen 
                                        name="Welcome" 
                                        children={(navigation)=>Welcome(navigation)}
                                        options={{
                                            headerShown:false
                                        }}
                                    />
                                }

                                <Stack.Screen 
                                    name="Tabs" 
                                    children={()=><MainNavigation />}
                                    options={{
                                        headerShown:false
                                    }}
                                />

                                <Stack.Screen 
                                    name="Search" 
                                    component={SearchScreen}
                                    options={{
                                        headerShown:false
                                    }}
                                />

                                <Stack.Screen 
                                    name="Signup Options" 
                                    component={Register}
                                    options={{
                                        headerShown:false
                                    }}
                                />

                                <Stack.Screen 
                                    name="Forgot Password" 
                                    component={ForgotPassword}
                                    options={{
                                        headerShown:false
                                    }}
                                />

                                <Stack.Screen 
                                    name="Business Details" 
                                    component={Business}
                                    options={{
                                        headerShown:false
                                    }}
                                />

                                <Stack.Screen 
                                    name="FAQ" 
                                    component={FAQ}
                                    options={{
                                        headerTitle:"",
                                        headerBackTitleStyle: {
                                            color:"#fff"
                                        },
                                        headerTintColor:"#fff",
                                        headerBackground: () => (
                                            <LinearGradient
                                                colors={['#7536ad', '#f7702d']}
                                                style={{flex:1}}
                                                start={{ 
                                                    x: 0.02, 
                                                    y: 1
                                                }}
                                                end={{
                                                    x: 1, 
                                                    y: 0.02
                                                }}
                                            />
                                        ),
                                        headerBackTitle:"Settings",
                                        headerBackTitleVisible:true
                                    }}
                                />

                                <Stack.Screen 
                                    name="About" 
                                    component={About}
                                    options={{
                                        headerTitle:"",
                                        headerBackTitleStyle: {
                                            color:"#fff"
                                        },
                                        headerTintColor:"#fff",
                                        headerBackground: () => (
                                            <LinearGradient
                                                colors={['#7536ad', '#f7702d']}
                                                style={{flex:1}}
                                                start={{ 
                                                    x: 0.02, 
                                                    y: 1
                                                }}
                                                end={{
                                                    x: 1, 
                                                    y: 0.02
                                                }}
                                            />
                                        ),
                                        headerBackTitle:"Settings",
                                        headerBackTitleVisible:true
                                    }}
                                />

                                <Stack.Screen 
                                    name="Terms Of Service" 
                                    component={TermsOfService}
                                    options={{
                                        headerTitle:"",
                                        headerBackTitleStyle: {
                                            color:"#fff"
                                        },
                                        headerTintColor:"#fff",
                                        headerBackground: () => (
                                            <LinearGradient
                                                colors={['#7536ad', '#f7702d']}
                                                style={{flex:1}}
                                                start={{ 
                                                    x: 0.02, 
                                                    y: 1
                                                }}
                                                end={{
                                                    x: 1, 
                                                    y: 0.02
                                                }}
                                            />
                                        ),
                                        headerBackTitle:"Settings",
                                        headerBackTitleVisible:true
                                    }}
                                />

                                <Stack.Screen 
                                    name="Privacy Policy" 
                                    component={PrivacyPolicy}
                                    options={{
                                        headerTitle:"",
                                        headerBackTitleStyle: {
                                            color:"#fff"
                                        },
                                        headerTintColor:"#fff",
                                        headerBackground: () => (
                                            <LinearGradient
                                                colors={['#7536ad', '#f7702d']}
                                                style={{flex:1}}
                                                start={{ 
                                                    x: 0.02, 
                                                    y: 1
                                                }}
                                                end={{
                                                    x: 1, 
                                                    y: 0.02
                                                }}
                                            />
                                        ),
                                        headerBackTitle:"Settings",
                                        headerBackTitleVisible:true
                                    }}
                                />
                            </>
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </Root>
    )
}
