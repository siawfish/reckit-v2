import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

export default function SelectInput({
    onChangeItem,
    data,
    defaultValue,
    placeholder,
    style,
    dropDownStyle,
    containerStyle,
    labelStyle
}) {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(data);
    const [value, setValue] = useState(defaultValue);
    return (
        <DropDownPicker
            open={open}
            setOpen={setOpen}
            items={items}
            setItems={setItems}
            value={value}
            setValue={setValue}
            onSelectItem={onChangeItem}
            placeholder={placeholder}
            arrowColor="#7536ad"
            placeholderStyle={{
                color: 'silver',
                fontFamily:'Open-Sans'
            }}
            labelStyle={[{
                fontSize: 14,
                textAlign: 'left',
                color: '#000',
                fontFamily:'Open-Sans'
            }, labelStyle]}
            style={[{
                borderRadius:6,
                borderBottomColor:"#fff",
                borderWidth:0,
                height:50,
            }, style]}
            containerStyle={containerStyle}
            dropDownContainerStyle={{
                ...dropDownStyle,
                paddingVertical: 10,
            }}
            listItemContainerStyle={{
                backgroundColor: '#fff',
                paddingVertical: 10,
                borderBottomColor: '#eee',
                borderBottomWidth: 1,
            }}
            listItemLabelStyle={{
                color: "000",
                fontFamily:'Open-Sans'
            }}
        />
    )
}

const styles = StyleSheet.create({

})
