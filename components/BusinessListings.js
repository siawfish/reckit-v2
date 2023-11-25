import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import Business from './Business'
import NoListing from './NoListing'
import { useSelector, useDispatch } from 'react-redux'
import { API } from '../utils/confiq'
import { setMyBusiness } from '../redux/businessStore'
import { Toast } from 'native-base'

export default function BusinessListings({navigation}) {
    const dispatch = useDispatch()
    const { myBusinesses } = useSelector(state=>state.business)
    const { authToken } = useSelector(state=>state.app)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(()=>{
        getMyBusinesses()
    },[])

    const getMyBusinesses = async ()=> {
        try {
            API.setHeader(`Authorization`, `Bearer ${authToken}`)
            const { ok, data, problem } = await API.get('/business/me')
            if(ok){
                dispatch(setMyBusiness(data))
                setIsLoading(false)
            } else {
                throw new Error(data.error ?? problem)
            }
        } catch (error) {
            console.log(error.message)
            Toast.show({
                text:error.message,
                duration: 5000,
                position: "top",
                type: "danger"
            })
            dispatch(setMyBusiness([]))
            setIsLoading(false)
        }
    }

    const gotoAddBusiness = () => {
        navigation.navigate('Add Business')
    }

    const publishedBusinesses = myBusinesses?.filter(business=>{
        return business.published===1
    })

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.icon}><MaterialIcons name="business-center" size={24} color="#7536ad" /> </Text>
                <Text style={styles.title}>Business listing</Text>
            </View>
            <Text style={{fontFamily: 'Open-Sans', paddingHorizontal:20, paddingBottom:10}}>There are <Text style={styles.count}>{publishedBusinesses?.length || 0}</Text> active businesses listed</Text>
            {
                isLoading ?
                <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                    <ActivityIndicator size="small" color="#7536ad" />
                </View> :
                <FlatList
                    data={myBusinesses}
                    renderItem={({item})=><Business navigation={navigation} item={item} />}
                    keyExtractor={item=>item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal:20}}
                    ListEmptyComponent={<NoListing showButton={false} />}
                />
            }
            <TouchableOpacity onPress={gotoAddBusiness} style={styles.addListing}>
                <Ionicons name="md-add" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff"
    },
    
    title: {
        color:"#7536ad",
        fontFamily: 'Open-Sans'
    },

    titleWrapper: {
        flexDirection:"row",
        alignItems:"center",
        marginVertical:10,
        paddingHorizontal:20
    },

    icon: {
        marginRight:5
    },

    count: {
        color:"#ffa300",
        fontFamily: 'Open-Sans'
    },

    addListing: {
        backgroundColor:"#7536ad",
        width:60,
        height:60,
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position:"absolute",
        bottom:50,
        right:20,
        zIndex:2
    }
})
