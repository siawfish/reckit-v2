import React from 'react'
import { Text, StyleSheet, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import ImageView from "react-native-image-viewing"

const windowWidth = Dimensions.get('window').width

export default function PhotosTab({
    photos, 
    businessName
}){
    const [viewPhotos, setViewPhotos] = React.useState(false)
    const [selectedPhoto, setSelectedPhoto] = React.useState(0)

    const viewerImages = photos?.map((photo)=>{
        return { uri: photo }
    })

    const viewImage = (index) => {
        setSelectedPhoto(index)
        setViewPhotos(true)
    }

    return (
        <ScrollView style={styles.galleryWrapper}>
            <Text style={styles.title}>Gallery</Text>
            <Text style={{fontFamily: 'Open-Sans'}}>{photos?.length} photo(s) of {businessName}</Text>
            <View style={styles.photosWrapper}>
                {
                    photos?.map((photo, i)=>{
                        return (
                            <TouchableOpacity key={i?.toString()} onPress={()=>viewImage(i)}>
                                <Image 
                                    key={i}
                                    source={{uri:photo}}
                                    style={{
                                        width:110,
                                        height:110,
                                        marginHorizontal:1,
                                        marginBottom:1
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    })
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    galleryWrapper: {
        paddingHorizontal:10,
        paddingTop:10,
        paddingBottom: 50
    },

    title: {
        color:"#7536ad",
        paddingBottom:20,
        fontSize:12,
        fontFamily: 'Open-Sans-Bold'
    },

    photosWrapper: {
        flexDirection:"row",
        flexWrap:"wrap",
        width:windowWidth-20,
        paddingVertical:10
    }
})
