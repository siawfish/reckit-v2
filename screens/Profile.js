import React from 'react'
import { Text, StyleSheet, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import propic from '../assets/propic.png'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import BusinessListings from '../components/BusinessListings'
import ReckonListings from '../components/ReckonListings'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'

const windowHeight = Dimensions.get('window').height

const Tab = createMaterialTopTabNavigator()

export default function Profile({
    navigation
}){
    const { profile } = useSelector(state=>state.app)
    return (
        <View style={styles.container}>

            <View style={styles.headerSection}>
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
                    <TouchableOpacity onPress={()=>navigation.navigate("Settings")} style={styles.settings}>
                        <Ionicons name="ios-settings" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileInfoWrapper} onPress={()=>navigation.navigate('Edit Profile')}>
                        <Image source={profile?.avatar ? {uri:profile?.avatar}: propic} style={styles.propic} />
                        <Text style={[styles.name, styles.capitalize]}>{profile?.displayName}</Text>
                        <Text style={styles.text}>{profile?.email}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <View style={styles.contentWrapper}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle:{
                            fontFamily:"Open-Sans",
                            fontSize:12,
                            fontWeight:"bold"
                        },
                        tabBarIndicatorStyle:{
                            backgroundColor:"#7536ad"
                        },
                        tabBarActiveTintColor:"#7536ad",
                        tabBarInactiveTintColor:"#aaa"
                    }}
                >
                    <Tab.Screen 
                        name="Businesses" 
                        children={()=><BusinessListings navigation={navigation} />}
                    />
                    <Tab.Screen 
                        name="Reckits" 
                        children={()=><ReckonListings navigation={navigation} />} 
                    />
                </Tab.Navigator>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },

    headerSection: {
        height:windowHeight/4,
        backgroundColor:"#7536ad"
    },

    gradientView: {
        paddingTop:40,
        alignItems:"center",
        justifyContent:"center",
        flex:1,
        borderBottomLeftRadius:250
    },

    text: {
        color:"#fff",
        paddingBottom:10,
        fontFamily: 'Open-Sans',
        marginBottom:10
    },

    capitalize: {
        textTransform:"capitalize"
    },

    propic: {
        width:80,
        height:80,
        borderRadius:40
    },

    name: {
        fontSize:18,
        color:"#fff",
        paddingTop:10,
        fontFamily: 'Open-Sans-Bold'
    },

    profileInfoWrapper: {
        justifyContent:"center",
        alignItems:"center"
    },

    settings: {
        position:"absolute",
        right:20,
        top:40
    },

    contentWrapper: {
        flex:1,
        backgroundColor:"#fff"
    }
})
