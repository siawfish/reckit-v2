import React from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Platform, Image, Alert, FlatList } from 'react-native'
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons'
import OpeningHours from '../components/OpeningHours';
import General from '../components/General';
import Reservation from '../components/Reservation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import BusinessStatus from '../components/BusinessStatus';
import BackButton from '../components/BackButton';
import { ActionSheet, Toast } from "native-base"
import Camera from '../components/Camera'
import * as ImagePicker from 'expo-image-picker';
import Gallery from './Gallery';
import { useDispatch, useSelector } from 'react-redux'
import ImagePreview from '../components/ImagePreview';
import { API, countries, cities } from '../utils/confiq';
import { updateMyBusiness } from '../redux/businessStore';
import FloatingButton from '../components/FloatingButton';
import Loader from '../components/Loader';

const Tab = createMaterialTopTabNavigator()
const BUTTONS = [
    { text: "Open photo library", icon: "folder", iconColor: "#7536ad" },
    { text: "Open camera", icon: "camera", iconColor: "#7536ad" },
    { text: "Cancel", icon: "close", iconColor: "#7536ad" }
]
const CANCEL_INDEX = 2

export default function EditBusiness({
    route,
    navigation
}){
    const dispatch = useDispatch()
    const { authToken } = useSelector(state=>state.app)
    const { myBusinesses } = useSelector(state=>state.business)
    const thisBusiness = myBusinesses.filter(biz=>{
        return biz.id===route.params.bid
    })
    const [business, setBusiness] = React.useState(thisBusiness[0])
    const [openCam, setOpenCam] = React.useState(false)
    const [preview, setPreview] = React.useState({
        status:false,
        image:null
    })
    const [gallery, setGallery] = React.useState(false)
    const [isUploading, setIsUploading] = React.useState(false)
    const [isSaving, setIsSaving] = React.useState(false)

    const onTextChange = (name, input)=> {
        setBusiness({
            ...business,
            [name]:input
        })
    }

    const toggleGallery = ()=> {
        setGallery(!gallery)
    }

    const toggleCam = ()=> {
        setOpenCam(!openCam)
    }

    const uploadImage = () => {
        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                title: "Upload image"
            },
            buttonIndex => {
                switch (BUTTONS[buttonIndex].text) {
                    case "Open photo library":
                        openLibrary()
                        break;
                    case "Open camera":
                        setOpenCam(true)
                        break;
                    case "Cancel":
                        break;
                    default:
                    break;
                }
            }
        )
    }

    const onOpeningHoursChange = (editedHours) =>{
        const filteredResults = business.business_hours.filter(businessHour=>{
            return businessHour.day!==editedHours.day
        })
        const newBusinessHours = [...filteredResults, editedHours]
        setBusiness({
            ...business,
            business_hours: newBusinessHours
        })
    }

    const editPhotos = async (photos)=> {
        try {
            setIsSaving(true)
            API.setHeader('Authorization', 'Bearer '+authToken)
            for(var i = 0; i < photos.length; i++){
                const { ok, data, problem } = await API.delete(`/business/images/${business.id}/${photos[i].substr(photos[i].lastIndexOf('.') + 1)}`)
                if(ok){
                    dispatch(updateMyBusiness(data.business))
                } else {
                    Alert.alert("Delete photo(s) error!", data.error??problem)
                }
            }
            setIsSaving(false)
        } catch (error) {
            Alert.alert("Delete photo(s) error!", error.message)
        }
    }

    const onCapture = (photo)=> {
        toggleCam()
        setPreview({
            status:true,
            image:photo.uri
        })
    }

    const uploadSelectedImage = async ()=> {
        try {
            setIsUploading(true)
            API.setHeaders({
                'Authorization':'Bearer '+authToken,
                'Content-Type': 'multipart/form-data'
            })
            let form = new FormData
            form.append('photos', {
                name: 'image.'+preview.image.substr(preview.image.lastIndexOf('.') + 1),
                type: 'image/jpeg',
                uri: preview.image
            })
            const response = await API.patch("/business/"+business.id, form)
            if(response.ok){
                setBusiness(response?.data?.business)
                dispatch(updateMyBusiness(response?.data?.business))
                setIsUploading(false)
                cancelSelectedImage()
                setOpenCam(false)
            } else {
                setIsUploading(false)
                Alert.alert("Error!",response?.data?.error)
            }
        } catch (error) {
            setIsUploading(false)
            Alert.alert(error.message)
        }
    }

    const cancelSelectedImage = ()=> {
        setPreview({
            status:false,
            image:null
        })
    }

    const openLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        })
        if (!result?.canceled) {
            setPreview({
                status: true,
                image: result.assets[0].uri
            })
        }
        setOpenCam(false)
    }

    const editDetails = async ()=> {
        try {
            setIsSaving(true)
            API.setHeader('Authorization', 'Bearer '+authToken)
            const { ok, data, problem } = await API.patch('/business/'+business.id, business)
            if(ok){
                setBusiness(data.business)
                dispatch(updateMyBusiness(data.business))
                Toast.show({
                    text:"Business successfully updated.",
                    duration: 5000,
                    position: "top",
                    type: 'success'
                })
            } else {
                Toast.show({
                    text:data.error||problem,
                    duration: 5000,
                    position: "top",
                    type: 'danger'
                })
            }
            setIsSaving(false)
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    const gotoProfile = ()=> {
        navigation.goBack()
    }
    return (
        <>
        <View style={styles.container}>
            <SafeAreaView style={{backgroundColor:"#fff"}}>
                <View style={[styles.navbar, Platform.OS==="android" && {marginTop:"10%"}]}>
                    <Text style={styles.heading}>Editing your business</Text>
                    <BackButton 
                        color="#7536ad"
                        onPress={gotoProfile}
                    />
                </View>
                <View style={styles.topSection}>
                    <View style={styles.underline}></View>
                    <View style={styles.section}>
                        <Text style={styles.title}>Business name</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput 
                                style={styles.input} 
                                defaultValue={business?.name} 
                                onChangeText={(text)=>onTextChange("name",text)}
                            />
                            <Text style={styles.ins}>Tap to edit</Text>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.title}>Business Status</Text>
                        <BusinessStatus
                            status={business?.published}
                            onPress={onTextChange}
                        />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.title}>Photo gallery</Text>
                        <View style={styles.photoWrapper}>
                            <Text style={styles.photoText}>{business?.name} has {business?.photos?.length || 0} photo(s)</Text>
                            <View style={styles.photoInsWrapper}>
                                <TouchableOpacity onPress={toggleGallery}>
                                    <Text style={styles.photoIns}>Open Gallery</Text>
                                </TouchableOpacity>
                                <Text><MaterialIcons name="navigate-next" size={24} color="#7536ad" /></Text>
                            </View>
                        </View>

                        <View style={styles.addPhotoWrapper}>
                            <FlatList
                                data={business?.photos}
                                keyExtractor={(item, index)=>index.toString()}
                                renderItem={
                                    ({item})=><Image 
                                        source={{uri:item}} 
                                        style={styles.thumbnail}
                                    />               
                                }
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ListFooterComponent={
                                    <TouchableOpacity onPress={uploadImage} style={styles.addPhotoBtn}>
                                        <Ionicons name="ios-add-circle-outline" size={24} color="#e0e0e0" />
                                        <Text style={styles.addPhotoText}>Add photo</Text>
                                    </TouchableOpacity>
                                }
                            />
                        </View>

                    </View>
                </View>
            </SafeAreaView>
            <View style={styles.bottomSection}>
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
                            name="Opening Hours" 
                            children={()=><OpeningHours onOpeningHoursChange={onOpeningHoursChange} openingHours={business?.business_hours} />}
                        />
                        <Tab.Screen 
                            name="General" 
                            children={()=><General cities={cities} business={business} onChangeText={onTextChange} />} 
                        />
                        <Tab.Screen 
                            name="Reservation Info" 
                            children={()=><Reservation onChangeText={onTextChange} reservation={business?.reservation_detail} />} 
                        />
                    </Tab.Navigator>
            </View>
        </View>
        <Gallery 
            open={gallery}
            photos={business?.photos}
            onClose={toggleGallery}
            onDelete={editPhotos}
        />
        {
            openCam &&
            <Camera 
                onCapture={onCapture}
                onClose={toggleCam} 
                open={openCam}
                onPickFromLibrary={openLibrary}
            />
        }
        <ImagePreview 
            open={preview.status}
            cancelSelectedImage={cancelSelectedImage}
            acceptSelectedImage={uploadSelectedImage}
            source={preview.image}
            isLoading={isUploading}
        />
        {
            business !== thisBusiness[0] &&
            <FloatingButton 
                icon={<Entypo name="save" size={24} color="white" />}
                onPress={editDetails}
            />
        }
        {
            isSaving &&
            <Loader />
        }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#f0f0f0"
    },

    navbar: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal:15,
        paddingVertical:10,
        backgroundColor:"#fff"
    },

    backBtn: {
        flexDirection:"row",
        alignItems:"center"
    },

    btnText: {
        color:"#7536ad",
        marginLeft:5,
        fontFamily: 'Open-Sans'
    },

    heading: {
        color:"#7536ad",
        fontSize:18,
        fontFamily: 'Open-Sans-Bold'
    },

    underline: {
        width:40,
        height:4,
        backgroundColor:"#ffa300",
        marginVertical:10,
        marginLeft:15
    },

    topSection: {
        backgroundColor:"#fff",
    },

    section: {
        paddingHorizontal:15,
        borderBottomWidth:1,
        borderBottomColor:"#e0e0e0",
        paddingVertical:15
    },

    title: {
        color:"#7536ad",
        fontSize:12,
        paddingBottom:10,
        fontFamily: 'Open-Sans-Bold'
    },

    preview: {
        width:"100%",
        height:"70%"
    },

    input: {
        fontSize:18,
        fontFamily: 'Open-Sans',
        flex:1
    },

    inputWrapper: {
        position:"relative",
        flex:1
    },

    ins: {
        position:"absolute",
        right:0,
        top:10,
        fontSize:12,
        color:"#cccac4",
        fontFamily: 'Open-Sans'
    },

    radioWrapper: {
        flexDirection:"row",
        alignItems:"center"
    },

    inputWrapper: {
        flexDirection:"row",
        alignItems:"center"
    },

    label: {
        marginLeft:5,
        fontFamily: 'Open-Sans'
    },

    photoWrapper: {
        justifyContent:"space-between",
        flexDirection:"row",
        paddingVertical:10,
        alignItems:"center"
    },

    photoText: {
        fontFamily: 'Open-Sans'
    },

    photoInsWrapper: {
        flexDirection:"row",
        alignItems:"center"
    },

    photoIns: {
        color:"#cccac4",
        fontFamily: 'Open-Sans'
    },

    addPhotoBtn: {
        width:80,
        height:80,
        borderRadius:4,
        borderWidth:1,
        borderStyle:"dashed",
        borderColor:"#e0e0e0",
        justifyContent:"center",
        alignItems:"center",
        marginRight:10,
    },

    thumbnail: {
        width:80,
        height:80,
        borderRadius:4,
        marginRight:10
    },

    addPhotoText: {
        color:"#e0e0e0",
        fontFamily: 'Open-Sans'
    },

    addPhotoWrapper: {
        paddingTop:10,
        paddingBottom:5,
        flexDirection:"row",
        flexWrap:"wrap"
    },

    bottomSection: {
        marginTop:20,
        flex: 1,
    },

    floatingBtn: {
        bottom:120, 
        width:50, 
        height:50, 
        borderRadius:25, 
        right:25, 
        backgroundColor:"#f7702d"
    }
})
