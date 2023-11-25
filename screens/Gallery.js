import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import BackButton from '../components/BackButton'
import { FontAwesome } from '@expo/vector-icons';
import Thumbnail from '../components/Thumbnail';

export default function Gallery({
    open=false,
    photos,
    onClose,
    onDelete
}) {
    const [marked, setMarked] = React.useState([])

    const mark = (img)=> {
        setMarked([...marked,img])
    }

    const unMark = (img)=>{
        const filteredList = marked.filter(image=>{
            return image!==img
        })
        setMarked(filteredList)
    }

    const deleteIt = ()=> {
        const markedPhotosObj = photos.filter(photo=>{
            return marked === photo
        })
        onDelete(markedPhotosObj)
        setMarked([])
    }
    
    return (
        <Modal
            visible={open}
            animationType="slide"
            transparent={true}
        >
            <SafeAreaView style={styles.safeContainer}>
                <View style={[styles.navbar]}>
                    <Text style={styles.heading}>Your gallery</Text>
                    <BackButton 
                        color="#7536ad"
                        onPress={onClose}
                    />
                </View>
                <View style={styles.deleteRow}>
                    <View style={styles.underline}></View>
                    <TouchableOpacity onPress={deleteIt} disabled={marked.length<1} style={styles.deleteBtn}>
                        <FontAwesome name="trash" size={24} color={marked.length>0?"#f55151":"#999"}/>
                        <Text style={[styles.btnText, marked.length>0&&{color:"#f55151"}]}>Delete</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.photoText}>Jools Inc has {photos?.length} photo(s)</Text>
                <View style={styles.addPhotoWrapper}>
                    {
                        photos?.map((photo,i)=>{
                            return (
                                <Thumbnail 
                                    key={"photo-"+i}
                                    id={i}
                                    source={{uri:photo}}
                                    onMark={(img)=>mark(img)}
                                    onUnMark={(img)=>unMark(img)}
                                />
                            )
                        })
                    }
                </View>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    safeContainer: {
        backgroundColor:"#ffffff",
        flex:1
    },

    navbar: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal:15,
        paddingVertical:10,
        backgroundColor:"#fff"
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
        marginVertical:15
    },

    addPhotoWrapper: {
        paddingTop:10,
        paddingHorizontal:15,
        paddingBottom:5,
        flexDirection:"row",
        flexWrap:"wrap"
    },

    thumbnail: {
        width:100,
        height:100,
        borderRadius:4,
        marginRight:10,
        marginBottom:10
    },

    photoText: {
        fontFamily: 'Open-Sans',
        marginLeft:15
    },

    deleteRow: {
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:15
    },

    deleteBtn: {
        justifyContent:"center",
        alignItems:"center"
    },

    btnText: {
        color:"#999"
    }

})
