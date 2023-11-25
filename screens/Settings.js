import React from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { resetAppStore } from '../redux/appStore'
import { API } from '../utils/confiq'

export default function Settings({
    navigation
}){
    const dispatch = useDispatch()
    const { authToken } = useSelector(state=>state.app)

    const confirmLogout = ()=> {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Continue',
                    onPress: logout,
                },
            ],
            {cancelable: false}
        )
    }

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

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.sectionWrapper}>
                <Text style={styles.title}>Support</Text>
                <Text style={styles.text}>User ID: 194</Text>
            </View>
            <View style={styles.sectionWrapper}>
                <TouchableOpacity onPress={()=>navigation.navigate("FAQ")} style={{marginBottom:20}}>
                    <Text style={styles.text}>Support & FAQ</Text>
                </TouchableOpacity>
                <Text style={styles.title}>App Information</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("About")}>
                    <Text style={styles.text}>About Reckit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.sectionWrapper}>
                <TouchableOpacity onPress={()=>navigation.navigate("Terms Of Service")}>
                    <Text style={styles.text}>Terms Of Service</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.sectionWrapper}>
                <TouchableOpacity onPress={()=>navigation.navigate("Privacy Policy")}>
                    <Text style={styles.text}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.sectionWrapper, {borderBottomWidth:0}]}>
                <Text style={styles.text}>App Version</Text>
                <Text style={styles.smallText}>v1.0.0 build 68</Text>
            </View>
            <View style={[styles.sectionWrapper, {borderBottomWidth:0}]}>
                <Text style={styles.title}>Manage Account</Text>
                <TouchableOpacity>
                    <Text style={styles.text}>Delete Account</Text>
                    <Text style={styles.smallText}>All your data will be permanently removed.</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.sectionWrapper, {borderBottomWidth:0}]}>
                <TouchableOpacity onPress={confirmLogout}>
                    <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff"
    },

    sectionWrapper: {
        paddingHorizontal:40,
        paddingVertical:15,
        borderBottomColor:"#e0e0e0",
        borderBottomWidth:1
    },

    title: {
        color:"#7536ad",
        paddingVertical:20,
        fontSize:15,
        fontFamily: 'Open-Sans'
    },

    text: {
        fontSize:18,
        color:"#333",
        fontFamily: 'Open-Sans'
    },

    smallText: {
        color:"#999",
        fontFamily: 'Open-Sans'
    }
})
