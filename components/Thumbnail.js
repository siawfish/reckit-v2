import React from 'react'
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

export default function Thumbnail({
    onMark,
    onUnMark,
    id,
    source
}) {
    const [marked, setMarked] = React.useState(false)
    const toggleMark = ()=> {
        if(marked===false){
            onMark(source.uri||source.url)
        }
        if(marked===true){
            onUnMark(source.uri||source.url)
        }
        setMarked(!marked)
    }
    return (
        <TouchableOpacity onPress={toggleMark}>
           {
                marked &&
                <>
                    <View style={styles.marked}></View>
                    <View style={styles.marker}>
                        <FontAwesome name="check-square" size={24} color="white" />
                    </View>
                </>
           }
            <Image 
                key={id}
                style={styles.thumbnail} 
                source={source}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    thumbnail: {
        width:100,
        height:100,
        borderRadius:4,
        marginRight:10,
        marginBottom:10
    },

    marked: {
        position:"absolute",
        top:0,
        bottom:10,
        right:10,
        left:0,
        backgroundColor:"#fff",
        opacity:0.4,
        zIndex:2
    },

    marker: {
        position:"absolute",
        top:5,
        left:5,
        zIndex:4
    }
})
