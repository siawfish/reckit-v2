import React, { useState, useEffect } from 'react';
import { StyleSheet, Linking, View, TouchableOpacity, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import BackButton from './BackButton';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import EnablePermission from './EnablePermission';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Cam({
    onClose,
    onCapture,
    open=false,
    onPickFromLibrary
}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const camera = React.useRef()
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
                setHasPermission(status === 'granted');
            })();
    }, [])

    const capture = async()=> {
        if (camera.current) {
            let photo = await camera.current.takePictureAsync()
            cropImage(photo)
        }
    }

    const cropImage = async (image)=> {
        const manipResult = await ImageManipulator.manipulateAsync(
            image.uri,
            [{
                crop: {
                    originX: 0,
                    originY: (image.height - image.width) / 2,
                    width: image.width,
                    height: image.width
                }
            }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        )
        onCapture(manipResult)
    }

    const toggleCamView = ()=> {
        setType(
            type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        )
    }

    if (!hasPermission) {
        return (
            <Modal
                transparent={false} 
                visible={true}
            >
                <EnablePermission 
                    onCancel={onClose}
                    title='Camera Access'
                    caption='Please enable camera access to be able to take a photo'
                    label='Enable camera access'
                    onPress={()=>Linking.openSettings()}
                />
            </Modal>
        )
    }

    return (
        <Modal 
            transparent={true} 
            visible={open}
        >
            <SafeAreaView style={{flex:1, backgroundColor:"#7536ad"}}>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <BackButton 
                            onPress={onClose}
                            color="white" 
                        />
                        <TouchableOpacity>
                            <Ionicons name="ios-flash" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Camera 
                        style={styles.camera} 
                        type={type}
                        ref={camera}
                    >
                    </Camera>
                    <View style={styles.bottomBtnWrapper}>
                        <TouchableOpacity
                            onPress={toggleCamView}
                        >
                            <MaterialCommunityIcons name="camera-retake" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={capture} style={styles.capture}>
                            <Entypo name="camera" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onPickFromLibrary}
                        >
                            <MaterialIcons name="perm-media" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#000"
    },

    camera: {
        flex:1
    },

    innerCam: {
        flex:1,
        justifyContent:"space-between"
    },

    buttonContainer: {
        backgroundColor:"#7536ad",
        padding:"5%",
        flexDirection:"row",
        justifyContent:"space-between"
    },

    capture: {
        width:70,
        height:70,
        borderRadius:35,
        backgroundColor:"#7536ad",
        justifyContent:"center",
        alignItems:"center"
    },

    bottomBtnWrapper: {
        paddingVertical:"5%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:"20%"
    }
})