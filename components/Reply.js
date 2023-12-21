import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import propic from '../assets/propic.jpeg'

export default function Reply ({
    toggleDetails,
    isSubmitting,
    onChangeText,
    onSubmit,
    item,
    showRepliesLink=true,
    defaultValue,
    user
}) {
    const input = React.useRef(null)

    const submit = async ()=> {
        if(defaultValue?.length>0){
            const response = await onSubmit()
            if(response){
                input.current.clear()
            }
        }
    }

    return (
        <View style={styles.commentArea}>
            {
                showRepliesLink &&
                <TouchableOpacity onPress={toggleDetails}>
                    <Text style={styles.viewComments}>View all replies</Text>
                </TouchableOpacity>
            }
            <View style={styles.commentWrapper}>
                <Image style={styles.propicSmall} source={user?.avatar ? {uri:user?.avatar} : propic} />
                <TextInput 
                    defaultValue={defaultValue}
                    ref={input}
                    editable={!isSubmitting}
                    onChangeText={onChangeText} 
                    placeholder="Respond to reckit" 
                    style={styles.input} 
                    returnKeyType='send'
                    blurOnSubmit={true}
                    multiline={true}
                    onSubmitEditing={submit}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    commentArea: {
        padding:10,
        borderTopColor:"#f0f0f0",
        borderTopWidth:1
    },

    commentWrapper: {
        padding:10,
        flexDirection:"row",
        alignItems:"center"
    },

    input: {
        fontFamily: 'Open-Sans',
        backgroundColor:"#f0f0f0",
        flex:1,
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:15,
        fontSize:14,
        height:40
    },

    viewComments: {
        fontSize:12,
        fontFamily:'Open-Sans-Bold',
        textDecorationLine:"underline",
        textDecorationColor:"#7536ad",
        color:"#7536ad"
    },

    propicSmall: {
        width:40,
        height:40,
        borderRadius:20,
        marginRight:10
    }
})
