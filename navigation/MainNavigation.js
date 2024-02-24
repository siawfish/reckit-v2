import React, { useEffect, useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NearMe from '../screens/NearMe'
import Reckit from '../screens/Reckit'
import Profile from '../screens/Profile'
import { Entypo } from '@expo/vector-icons'
import ReckitButton from '../components/ReckitButton'
import LoginForm from '../components/LoginForm'
import { useSelector, useDispatch } from 'react-redux'
import { API } from '../utils/confiq'
import { Alert, Platform } from 'react-native'
import { setUserProfile, resetAppStore } from '../redux/appStore'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Toast } from 'native-base'
import Constants from 'expo-constants';

const Tab = createBottomTabNavigator()


export default function MainNavigation () {
    const dispatch = useDispatch()
    const { isAuthenticated, authToken, profile } = useSelector(state=>state.app) 
    const [pushToken, setPushToken] = React.useState(null)

    useLayoutEffect(()=>{
        if(!isAuthenticated) return;
        registerForPushNotificationsAsync()
    },[isAuthenticated])

    const registerForPushNotificationsAsync = async () => {
        try {
            let token;
    
            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
            }
        
            if (Device.isDevice) {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                    alert('Failed to get push token for push notification!');
                    return;
                }
                token = (await Notifications.getExpoPushTokenAsync({
                    projectId: Constants.expoConfig.extra.eas.projectId,
                })).data;
                if(token){
                    await updatePushToken(token)
                }
                return;
            } 
            throw new Error('Must use physical device for Push Notifications');
        } catch (error) {
            Toast.show({
                text:error.message,
                duration: 5000,
                position: "bottom",
                type: "danger"
            })
        }
    }
    
    const updatePushToken = async (token)=> {
        try {
            API.setHeader(`Authorization`, `Bearer ${authToken}`)
            const { ok, data, problem } = await API.post('/register-notification', { 
                token,
                id: profile?.id
            })
            if(ok){
                dispatch(setUserProfile({
                    ...profile,
                    pushToken:token
                }))
                return;
            }
            throw new Error(data?.error??problem)
        } catch (error) {
            Toast.show({
                text:error.message,
                duration: 5000,
                position: "bottom",
                type: "danger"
            })
        }
    }

    useEffect(()=>{
        verifyUser()
    },[])

    const logout = async () => {
        try {
            API.setHeader(`Authorization`, `Bearer ${authToken}`)
            const { ok, data, problem } = await API.post('/logout')
            if(ok){
                dispatch(resetAppStore())
                return;
            }
            throw new Error(data?.error??problem)
        } catch (error) {
            Toast.show({
                text:error.message,
                duration: 5000,
                position: "top",
                type: "danger"
            })
        }
    }

    const verifyUser = async () => {
        try {
            if(isAuthenticated){
                API.setHeader('Authorization', 'Bearer '+authToken)
                const { ok, data, problem } = await API.get("/isAuthenticated")
                if(!ok){
                    throw new Error(data?.error??problem)
                }
                dispatch(setUserProfile(data?.user))
            }
        } catch (error) {
            Alert.alert(
                'Session Expired',
                'Your session has expired. Please login again.',
                [
                    {
                        text: 'OK',
                        onPress: ()=>logout()
                    }
                ],
                {cancelable: false}
            )
        }
    }


    return (
        <Tab.Navigator
            backBehavior="order"
            screenOptions={{
                tabBarActiveTintColor:"#7536ad",
                keyboardHidesTabBar:true,
            }}
        >
            <Tab.Screen 
                name="NearMe" 
                component={NearMe} 
                options={{
                    tabBarIcon:({focused})=><Entypo name="compass" size={24} color={focused?"#7536ad":"grey"}/>,
                    headerShown:false
                }}
            />
            <Tab.Screen 
                name="Reckit" 
                component={
                    isAuthenticated ? Reckit : LoginForm
                } 
                options={{
                    tabBarButton:(props)=><ReckitButton {...props} />,
                    headerShown:false
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={
                    isAuthenticated ? Profile : LoginForm
                } 
                options={{
                    tabBarIcon:({focused})=><Entypo name="user" size={24} color={focused?"#7536ad":"grey"} />,
                    headerShown:false
                }}
            />
        </Tab.Navigator>
    )
}

