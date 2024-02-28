import React from 'react'
import { Text, StyleSheet, View, Dimensions, Image, ActivityIndicator, Platform, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import HomeTab from '../components/HomeTab'
import AboutTab from '../components/AboutTab'
import PhotosTab from '../components/PhotosTab'
import ReviewsTab from '../components/ReviewsTab'
import { LinearGradient } from 'expo-linear-gradient'
import BackButton from '../components/BackButton'
import { useSelector } from 'react-redux'
import { Toast } from 'native-base'
import { API } from '../utils/confiq'
import ImageView from "react-native-image-viewing"
import { TouchableOpacity } from 'react-native-gesture-handler'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Tab = createMaterialTopTabNavigator()

export default function Business({
    route,
    navigation
}) {
    const { location } = useSelector(state=>state.app)
    const [isLoading, setIsLoading] = React.useState(true)
    const [business, setBusiness] = React.useState(null)
    const [reviews, setReviews] = React.useState([])
    const [viewPhotos, setViewPhotos] = React.useState(false)
    const [selectedPhoto, setSelectedPhoto] = React.useState(0)

    React.useEffect(() => {
        getBusinessDetails()
    },[])

    const haversine_distance = (mk1, mk2) => {
        var R = 3958.8; // Radius of the Earth in miles
        var rlat1 = mk1?.lat * (Math.PI/180); // Convert degrees to radians
        var rlat2 = mk2?.lat * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (mk2?.lng-mk1?.lon) * (Math.PI/180); // Radian difference (longitudes)
  
        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d;
    }

    const getBusinessDetails = async ()=> {
        try {
            setIsLoading(true)
            const { ok, data, problem } = await API.get("/business/"+route.params.bid)
            if(ok){
                console.log("data.business: ", data.business)
                const reviewsArr = await getReviews()
                setBusiness(data.business)
                setReviews(reviewsArr)
            } else {
                Toast.show({
                    text:data.error||problem,
                    duration: 5000,
                    position: "top",
                    type: "danger"
                })
            }
            setIsLoading(false)
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

    const getReviews = async ()=> {
        try {
            const { ok, data, problem }= await API.get('/reviews/'+route.params.bid)
            if(ok){
                return data
            } else {
                Toast.show({
                    text:data.error||problem,
                    duration: 5000,
                    position: "top",
                    type: "danger"
                })
                return []
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

    const viewImage = (index) => {
        setSelectedPhoto(index)
        setViewPhotos(true)
    }

    const viewerImages = business?.photos?.map((photo)=>{
        return { uri: photo }
    })

    return (
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <LinearGradient
                    colors={['transparent', '#f7702d']}
                    style={styles.gradientView}
                    start={{ 
                        x: 0.02, 
                        y: 0.1
                    }}
                    end={{
                        x: 1, 
                        y: 0.02
                    }}
                >
                </LinearGradient>
                <View style={styles.titleRow}>
                    <View style={styles.titleWrapper}>
                        <Text numberOfLines={2} style={styles.businessName}>{business?.name}</Text>
                        <Text style={styles.businessRange}>{business!==null&&haversine_distance(location, business?.location).toFixed(1)} km from you</Text>
                    </View>
                    <BackButton 
                        onPress={()=>navigation.goBack()}
                        color="white"
                    />
                </View>
                <View style={styles.imagesWrapper}>
                    <View style={styles.imgIconWrapper}>
                        <Ionicons name="ios-images" size={24} color="white" />
                        <Text style={styles.imgCount}>{business?.photos?.length}</Text>
                    </View>
                    <FlatList
                        data={business?.photos??[]}
                        renderItem={
                            ({item, index})=><TouchableOpacity onPress={()=>viewImage(index)} style={styles.imgPlaceholder}>
                                <Image style={styles.img} source={{uri:item}} />
                            </TouchableOpacity>
                        }
                        horizontal
                        keyExtractor={(item, index)=>index.toString()}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={styles.imgPlaceholder}>
                                <Ionicons name="ios-images" size={24} color="white" />
                            </View>
                        }
                    />
                </View>
            </View>
            <View style={styles.bodySection}>
                {
                    isLoading ?
                    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                        <ActivityIndicator size="small" color="#7536ad" />
                    </View> :
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
                            name="Home" 
                        >
                            {
                                (props)=><HomeTab {...props} reviews={reviews} business={business} />
                            }
                        </Tab.Screen>
                        <Tab.Screen 
                            name="About" 
                        >
                            {
                                (props)=><AboutTab {...props} business={business} />
                            }
                        </Tab.Screen>
                        <Tab.Screen 
                            name="Photos" 
                        >
                            {
                                (props)=><PhotosTab {...props} businessName={business.name} photos={business.photos} />
                            }
                        </Tab.Screen>
                        <Tab.Screen 
                            name="Reviews" 
                        >
                            {
                                (props)=><ReviewsTab {...props} business={business} reviews={reviews} refreshBusiness={getBusinessDetails} />
                            }
                        </Tab.Screen>
                    </Tab.Navigator>
                }
            </View>
            {
                viewPhotos &&
                <ImageView
                    images={viewerImages??[]}
                    imageIndex={selectedPhoto}
                    visible={viewPhotos}
                    onRequestClose={() => setViewPhotos(false)}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#f0f0f0"
    },

    headerSection: {
        height:Platform.OS==="android" ? windowHeight/2.3 : windowHeight/2.5,
        backgroundColor:"#7536ad",
        paddingTop:60
    },

    gradientView: {
        borderBottomLeftRadius:250,
        position:'absolute',
        top:0,
        left:0,
        right:0,
        height:Platform.OS==="android" ? windowHeight/2.3 : windowHeight/2.5
    },

    titleRow: {
        paddingLeft:50,
        flexDirection:"row",
        justifyContent:"space-between",
        paddingRight:10,
        // width:"100%",
        alignItems:"flex-start"
    },

    businessName: {
        color:"#fff",
        fontSize:22,
        paddingBottom:10,
        fontFamily: 'Open-Sans'
    },

    titleWrapper: {
        flex:1,
        paddingRight:10
    },

    businessRange: {
        color:"#fff",
        fontFamily: 'Open-Sans'
    },

    navText: {
        color:"#fff",
        fontFamily: 'Open-Sans'
    },

    imagesWrapper: {
        flexDirection:"row",
    },

    imgIconWrapper: {
        paddingHorizontal:10,
        alignItems:"center"
    },

    imgCount: {
        color:"#fff",
        paddingVertical:5,
        fontFamily: 'Open-Sans'
    },

    imgPlaceholder: {
        width:windowWidth/2.1,
        backgroundColor:"#cfcfcf",
        borderRadius:4,
        height: windowHeight/3.5,
        justifyContent:"center",
        alignItems:"center",
        marginRight:10,
        marginTop:10
    },

    img: {
        width:"100%",
        height:"100%",
        borderRadius:4
    },

    bodySection: {
        marginTop:30,
        flex: 1,
    }
})
