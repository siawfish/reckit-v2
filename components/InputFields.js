import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons'
import { Item } from 'native-base'

export default function InputFields({
    clear,
    containerStyle,
    search,
    locationSearch, 
    placeholder,
    style,
    onFocus,
    autoFocus,
    onChangeText,
    onBlur,
    defaultValue,
    textContentType,
    editable=true
}){
    const inputFeild = React.useRef(null)

    const onClear = ()=> {
        inputFeild.current.clear()
        clear&&clear()
    }
    
    return (
        <Item style={[styles.wrapper, containerStyle]}>
            {
                search &&
                <TouchableOpacity style={styles.icon} >
                    <FontAwesome name="search" size={20} color="black" />
                </TouchableOpacity> 
            }
            {
                locationSearch &&
                <TouchableOpacity style={styles.icon} >
                    <Entypo name="compass" size={20} color="black" />
                </TouchableOpacity>
            }  
            <TextInput
                editable={editable}
                ref={inputFeild}
                placeholder={placeholder}
                style={[styles.input, search && {paddingHorizontal:0}, locationSearch && {paddingHorizontal:0}, style]}
                onFocus={onFocus}
                autoFocus={autoFocus}
                onChangeText={onChangeText}
                onBlur={onBlur}
                defaultValue={defaultValue}
                textContentType={textContentType}
                returnKeyType={search || locationSearch ? 'search' : 'done'}
            />
            {
                defaultValue!=="" && editable &&
                <TouchableOpacity onPress={onClear} style={styles.icon} >
                    <AntDesign name="closecircle" size={15} color="black" />
                </TouchableOpacity>
            }
        </Item>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius:6,
        backgroundColor:"#fff",
        height:40,
        width:"100%",
        borderBottomWidth:0,
    },

    input: {
        flex:1,
        fontSize:15,
        fontFamily: 'Open-Sans',
        paddingHorizontal:15,
        direction: "ltr",
        textAlign: "left"
    },

    icon: {
        paddingHorizontal:10
    }
})
