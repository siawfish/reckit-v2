import React from 'react'
import { Text, StyleSheet, View, Image, TextInput, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import propic from '../assets/propic.jpeg'
import CancelButton from './CancelButton'
import PostButton from './PostButton'

export default function PostForm({
    placeholder,
    defaultValue,
    maxLength=300,
    onChangeText,
    onPost,
    open,
    buttonLabel,
    user,
    isLoading,
    disabled,
    onClose
}) {
    return (
        <Modal
            transparent={true}
            visible={open}
        >
            <SafeAreaView style={styles.postReckonWrapper}>
                <CancelButton 
                    onPress={onClose} 
                    containerStyle={{
                        marginVertical:10
                    }} 
                    btnText={{
                        color:"#7536ad"
                    }} 
                    iconColor='#7536ad' 
                />
                <View style={styles.inputRow}>
                    <Image 
                        source={
                            user?{uri:user?.avatar}:
                            propic
                        } 
                        style={styles.propicSmall} 
                    />
                    <TextInput 
                        defaultValue={defaultValue}
                        style={styles.input}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        multiline
                        autoFocus
                        autoCorrect
                        onChangeText={(text)=>onChangeText(text)}
                    />
                    <Text style={styles.count}>{defaultValue?.length}/{maxLength-defaultValue?.length}</Text>
                </View>
                <View style={styles.btnRow}>
                    <PostButton 
                        label={buttonLabel}
                        onPress={onPost}
                        isLoading={isLoading}
                        disabled={disabled}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    postReckonWrapper: {
        padding:15,
        backgroundColor:"#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:4,
        flex:1,
        paddingTop:50
    },

    propicSmall: {
        width:50,
        height:50,
        borderRadius:25,
        marginRight:10
    },

    inputRow: {
        flexDirection:"row",
        position:"relative"
        // paddingBottom:10
    },

    input: {
        backgroundColor: "#eee",
        flex:1,
        borderRadius:4,
        paddingHorizontal:10,
        paddingTop:8,
        paddingBottom:20,
        height:80,
        textAlignVertical:'top',
        fontFamily:"Open-Sans"
    },

    btnRow: {
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        marginTop:10
    },

    count: {
        position:"absolute",
        right:10,
        bottom:0,
        fontFamily:"Open-Sans"
    }
})
