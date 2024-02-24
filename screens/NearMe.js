import React from 'react'
import { 
    Text, 
    StyleSheet, 
    View, 
    Image, 
    Platform, 
    Dimensions, 
    ActivityIndicator, 
    Linking,
    FlatList } from 'react-native'
import InputFields from '../components/InputFields'
import Category from '../components/Category'
import ListItem from '../components/ListItem'
import logo from '../assets/logo.png'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../utils/confiq'
import { setBusinesses } from '../redux/businessStore'
import { Toast } from 'native-base'
import NoListing from '../components/NoListing'
import EnablePermission from '../components/EnablePermission'
import * as Animatable from 'react-native-animatable';

const windowHeight = Dimensions.get('window').height

export default function NearMe({
    navigation
}){
    const dispatch = useDispatch()
    const { businesses }  = useSelector(state=>state.business)
    const { location, locationPermission } = useSelector(state=>state.app)
    const [isLoading, setIsLoading] = React.useState(true)
    const [refreshing, setRefreshing] = React.useState(false)

    React.useLayoutEffect(()=>{
        if(locationPermission){
            getBusinesses()
        }
    },[locationPermission])

    const getBusinesses = async ()=> {
        try {
            setRefreshing(true)
            const { ok, data, problem } = await API.get('/near-me', {
                lat:location.lat, 
                long:location.lon
            })
            if(ok){
                dispatch(setBusinesses(data))
                setRefreshing(false)
                setIsLoading(false)
                return
            }
            throw new Error(data.error||problem)
        } catch (error) {
            Toast.show({
                text:error.message,
                duration: 5000,
                position: "top",
                type: "danger"
            })
            dispatch(setBusinesses([]))
            setRefreshing(false)
            setIsLoading(false)
        }
    }

    const gotoLocationSettings = ()=>{
        Linking.openSettings()
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
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
                    <Image source={logo} style={[styles.logo]} />
                    <InputFields
                        onFocus={()=>navigation.navigate("Search")} 
                        search
                        defaultValue=""
                        placeholder="What are you looking for?" 
                        containerStyle={{marginBottom:10}}
                    />
                </LinearGradient>
            </View>
            <Animatable.View duration={300} animation='fadeInUpBig' style={styles.categoryContainer}>
                <View style={styles.category}>
                    <Category navigation={navigation} caption="Food & Restaurant" type="food_restaurant" />
                    <Category navigation={navigation} caption="Bar & Nightlife" type="bar_nightlife" />
                    <Category navigation={navigation} caption="Small Business" type="small_business" />
                </View>
                <View style={styles.category}>
                    <Category navigation={navigation} caption="Accommodation" type="accommodation" />
                    <Category navigation={navigation} caption="Event" type="event" />
                    <Category navigation={navigation} caption="See More" type="more" />
                </View>
            </Animatable.View>
            {
                locationPermission ? 
                <>
                    {
                        isLoading ? 
                        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                            <ActivityIndicator size="small" color="#7536ad" />
                        </View>
                            :
                        <View style={styles.contentWrapper}>
                            <FlatList
                                onRefresh={getBusinesses}
                                refreshing={refreshing}
                                stickyHeaderIndices={[0]}
                                ListHeaderComponent={<Text style={[styles.title, {backgroundColor:"white"}]}>Attractions near you</Text>}
                                data={businesses}
                                renderItem={({item})=><ListItem business={item} style={styles.listItem} navigation={navigation} />}
                                keyExtractor={business=>business.id}
                                showsVerticalScrollIndicator={false}
                                initialNumToRender={5}
                                ListEmptyComponent={<NoListing title={"Oops!"} showButton={false} caption="Sorry, there are no businesses listed near your location." />}
                            />
                        </View>
                    }
                </> :
                <EnablePermission 
                    onPress={gotoLocationSettings}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#e4e4e4",
        direction:"ltr"
    },

    searchContainer: {
        height:Platform.OS==="ios" ? windowHeight/5.5 : windowHeight/5,
        backgroundColor:"#7536ad",
        justifyContent:"flex-end",
    },

    gradientView: {
        paddingTop:Platform.OS==="ios" ? 45 : 30,
        paddingBottom:20,
        paddingHorizontal:30,
        flex:1,
        // borderBottomLeftRadius:200
    },

    categoryContainer: {
        backgroundColor:"#fff",
        paddingVertical:5,
        marginBottom:15
    },

    category: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-start",
        paddingVertical:10
    },

    contentWrapper: {
        backgroundColor:"#fff",
        flex:1
    },

    title: {
        color:"#7536ad",
        paddingVertical:10,
        fontSize:12,
        paddingHorizontal:15,
        fontFamily: 'Open-Sans-Bold'
    },

    listItem: {
        marginHorizontal:15
    },

    logo: {
        width:64, 
        height:20,
        alignSelf:"center",
        marginVertical:10,
        marginTop:Platform.OS==="ios" ? 10 : null
    }
})
