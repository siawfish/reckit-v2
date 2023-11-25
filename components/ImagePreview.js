import React from 'react'
import { StyleSheet, TouchableOpacity, View, Modal, Image, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Loader from './Loader'

export default function ImagePreview({
    open=false,
    source,
    cancelSelectedImage,
    acceptSelectedImage,
    isLoading
}) {
    return (
        <Modal 
            transparent={true} 
            visible={open}
        >
            {
                isLoading &&
                <Loader 
                    containerStyle={{backgroundColor:"#ffffff"}}
                />
            }   
            <View style={styles.previewWrapper}>
                <Image style={styles.preview} source={{uri:source}} />
                <View style={styles.previewActionsWrapper}>
                    <TouchableOpacity onPress={cancelSelectedImage} style={styles.previewBtn}>
                        <AntDesign name="closecircle" size={50} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={acceptSelectedImage} style={styles.previewBtn}>
                        <AntDesign name="checkcircle" size={50} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    previewWrapper: {
        flex:1,
        justifyContent:"center",
        backgroundColor:"#000"
    },

    preview: {
        width:"100%",
        height:500,
        resizeMode:"contain"
    },

    previewActionsWrapper: {
        flexDirection:"row",
        justifyContent:"center",
        paddingVertical:20
    },

    previewBtn: {
        paddingHorizontal:10
    }
})
