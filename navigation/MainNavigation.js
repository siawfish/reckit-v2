import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NearMe from '../screens/NearMe'
import Reckit from '../screens/Reckit'
import Profile from '../screens/Profile'
import { Entypo } from '@expo/vector-icons'
import ReckitButton from '../components/ReckitButton'
import LoginForm from '../components/LoginForm'
import { useSelector, useDispatch } from 'react-redux'
import { API } from '../utils/confiq'
import { Alert } from 'react-native'
import { setUserProfile, resetAppStore } from '../redux/appStore'

const Tab = createBottomTabNavigator()


export default function MainNavigation () {
    const dispatch = useDispatch()
    const { isAuthenticated, authToken } = useSelector(state=>state.app) 

    useEffect(()=>{
        verifyUser()
    },[])

    const logout = async () => {
        try {
            API.setHeader(`Authorization`, `Bearer ${authToken}`)
            const { ok, data, problem } = await API.post('/logout')
            if(ok){
                dispatch(resetAppStore())
            } else {
                throw new Error(data?.error??problem)
            }
        } catch (error) {
            Alert.alert('Logout Error', error.message)
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

