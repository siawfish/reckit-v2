import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputFields from '../components/InputFields'
import propic from '../assets/propic.png'
import SubmitButton from '../components/SubmitButton'
import { useSelector, useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons';
import CancelButton from '../components/CancelButton'
import { ActionSheet, Toast } from "native-base"
import Camera from '../components/Camera'
import * as ImagePicker from 'expo-image-picker';
import ImagePreview from '../components/ImagePreview';
import { API } from '../utils/confiq'
import { setUserProfile } from '../redux/appStore'

const BUTTONS = [
    { text: "Open photo library", icon: "folder", iconColor: "#7536ad" },
    { text: "Open camera", icon: "camera", iconColor: "#7536ad" },
    { text: "Cancel", icon: "close", iconColor: "#7536ad" }
]
const CANCEL_INDEX = 2

export default function EditProfile({navigation}) {
    const dispatch = useDispatch()
    const { profile, authToken } = useSelector(state=>state.app)
    const [name, setName] = useState(profile?.displayName)
    const [phone, setPhone] = useState(profile?.phone??"")
    const [location, setLocation] = useState(profile?.location??"")
    const [openCam, setOpenCam] = useState(false)
    const [preview, setPreview] = useState({
        status:false,
        image:profile?.avatar??null
    })
    const [isLoading, setIsLoading] = useState(false)

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
        setOpenCam(false)
        setPreview({
            status:true,
            image:result.uri
        })
    }

    const onCapture = (photo)=> {
        setOpenCam(false)
        setPreview({
            status:true,
            image:photo.uri
        })
    }

    const validate = ()=> {
        if(name.length<3) {
            onError("Name must be at least 3 characters long")
            return false
        }
        if(phone.length<10) {
            onError("Phone number must be at least 10 digits")
            return false
        }
        if(location.length<3) {
            onError("Location must be at least 3 characters")
            return false
        }
        return true
    }

    const onError = (error)=> {
        Toast.show({
            text: error,
            type: "danger",
            duration: 2000
        })
    }

    const onSubmit = async ()=> {
        try {
            setIsLoading(true)
            if(!validate()) {
                setIsLoading(false)
                return
            }
            const formData = new FormData()
            formData.append("avatar", {
                name: 'image.'+preview.image.substr(preview.image.lastIndexOf('.') + 1),
                type: 'image/jpeg',
                uri: preview.image
            })
            formData.append("firstName", name.split(' ').slice(0, -1).join(' '))
            formData.append("lastName", name.split(' ').slice(-1).join(' '))
            formData.append("otherNames", name.split(' ').slice(1, -1).join(' '))
            formData.append("phone", phone)
            formData.append("location", location)
            API.setHeader('Authorization', 'Bearer '+authToken)
            const { ok, data, problem } = await API.patch('/users', formData)
            if(ok) {
                dispatch(setUserProfile(data?.user))
                Toast.show({
                    text: "Profile updated successfully",
                    type: "success",
                    duration: 2000
                })
                setIsLoading(false)
            } else {
                throw new Error(data?.error??problem)
            }
        } catch (error) {
            onError(error.message)
            setIsLoading(false)
        }
    }

    return (
        <KeyboardAwareScrollView bounces={false} contentContainerStyle={styles.view}>
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
                <SafeAreaView style={styles.container}>
                    <CancelButton style={styles.cancelBtn} onPress={()=>navigation.goBack()} />
                    <Text style={styles.title}>View and edit profile</Text>
                    <View style={styles.underline}></View>
                    <TouchableOpacity onPress={uploadImage} style={styles.imageWrapper}>
                        <View style={styles.cam}>
                            <Entypo name="camera" size={24} color="#f7702d" />
                        </View>
                        <Image source={preview?.image?{uri:preview?.image}:propic} style={styles.propic} />
                    </TouchableOpacity>
                    <Text style={styles.label}>Full Name</Text>
                    <InputFields 
                        defaultValue={name} 
                        onChangeText={(text)=>setName(text)} 
                        style={styles.input} 
                        placeholder="Your full name" 
                        clear={()=>setName("")}
                    />
                    <View style={styles.formRow}>

                        <View style={[styles.row, styles.marginRight]}>
                            <Text style={styles.label}>Phone number</Text>
                            <InputFields 
                                textContentType={'telephoneNumber'}
                                defaultValue={phone} 
                                onChangeText={(text)=>setPhone(text)} 
                                style={styles.input} 
                                placeholder="Phone number" 
                                clear={()=>setPhone("")}
                            />
                        </View>
                        <View style={[styles.row, styles.marginleft]}>
                            <Text style={styles.label}>Location</Text>
                            <InputFields 
                                defaultValue={location} 
                                onChangeText={(text)=>setLocation(text)} 
                                style={styles.input} 
                                placeholder="Location" 
                                clear={()=>setLocation("")}
                            />
                        </View>

                    </View>
                    <Text style={styles.label}>Email</Text>
                    <InputFields 
                        editable={false}
                        defaultValue={profile?.email} 
                        style={styles.input} 
                    />
                    <SubmitButton 
                        disabled={name==="" || phone==="" || location===""}
                        label={'Save'}
                        isLoading={isLoading}
                        onPress={onSubmit}
                    />
                    {
                        openCam &&
                        <Camera 
                            onCapture={onCapture}
                            onClose={()=>setOpenCam(false)} 
                            open={openCam}
                            onPickFromLibrary={openLibrary}
                        />
                    }
                    
                    <ImagePreview 
                        open={preview.status&&preview.image}
                        cancelSelectedImage={cancelSelectedImage}
                        acceptSelectedImage={()=>setPreview({...preview, status:false})}
                        source={preview.image}
                    />
                </SafeAreaView>
            </LinearGradient>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#7536ad'
    },

    gradientView: {
        paddingHorizontal:20
    },

    container: {
        height:"100%"
    },

    title: {
        fontSize:25,
        width:"60%",
        color:"white",
        paddingTop:"5%",
        fontFamily: 'Open-Sans-Bold'
    },

    input: {
        paddingHorizontal:10
    },

    label: {
        color:"white",
        fontSize:15,
        paddingVertical:10,
        fontFamily: 'Open-Sans-Bold'
    },

    underline: {
        width:40,
        height:4,
        backgroundColor:"#ffa300",
        marginVertical:20
    },

    propic: {
        width:100,
        height:100,
        borderRadius:50,
        alignSelf: "center"
    },

    imageWrapper: {
        alignItems:"center",
        justifyContent:"center",
        position:"relative"
    },

    cam: {
        position:"absolute",
        top: "40%",
        zIndex:1
    },

    formRow: {
        flexDirection:"row",
        justifyContent:"space-between"
    },

    row: {
        width: "48%"
    },

    marginLeft: {
        marginLeft:5
    },

    marginRight: {
        marginRight:5
    },

    cancelBtn: {
        position:"absolute",
        right:0,
        top:20
    }
})
