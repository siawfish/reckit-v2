import React from 'react'
import { Text, StyleSheet, View, TextInput, ScrollView } from 'react-native'
import CategoryIcon from '../components/CategoryIcon';
import SelectInput from './SelectInput';
import { useSelector } from 'react-redux';
import Map from './Map';

export default function General({
    business,
    onChangeText,
    cities
}){
    const { categories } = useSelector(state=>state.app)
    const categoriesItem = categories.map(category=>{
        return {
            label:category.name,
            value:category.name,
            icon:()=><CategoryIcon type={category.key} />
        }
    })

    const onSelect = (name, val)=> {
        onChangeText(name,val.value)
    }
    
    return (
        <ScrollView 
            contentContainerStyle={{
                backgroundColor:"#fff",
                paddingBottom: 100
            }}
        >
            
            <View style={styles.section}>
                <Text style={styles.title}>Business Category</Text>
                {
                    categoriesItem &&
                    <SelectInput 
                        data={categoriesItem}
                        defaultValue={business?.category}
                        style={{
                            borderWidth:1,
                            borderBottomColor:"#e0e0e0"
                        }}
                        onChangeItem={(item)=>onSelect("category", item)}
                    />
                }
                <Text style={[styles.title,{marginTop:20}]}>Description</Text>
                <View style={styles.descWrapper}>
                    <TextInput 
                        maxLength={300}
                        multiline 
                        style={styles.desc} 
                        placeholder="Tap to add a short description about your business..." 
                        defaultValue={business?.description}
                        onChangeText={(text)=>onChangeText("description", text)}
                    />
                </View>
                <Text style={styles.descCount}>{!business?.description?300:300-business?.description?.length} characters left</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Business Address</Text>

                <View style={styles.inputRow}>
                    <View style={styles.leftWrapper}>
                        <Text style={[styles.title, styles.addressLabel]}>Street Name / Address</Text>
                        <TextInput 
                            style={[styles.input, styles.address]} 
                            placeholder="Patrice Lumba Rd." 
                            defaultValue={business?.address}
                            onChangeText={(text)=>onChangeText("address", text)}
                        />
                    </View>
                    <View style={styles.rightWrapper}>
                        <Text style={[styles.title, styles.addressLabel]}>House No.</Text>
                        <TextInput 
                            style={[styles.input, styles.address]} 
                            placeholder="22" 
                            defaultValue={business?.building}
                            onChangeText={(text)=>onChangeText("building", text)}
                        />
                    </View>
                </View>

                <View style={styles.inputRow}>

                    <View style={styles.leftWrapper}>
                        <Text style={[styles.title, styles.addressLabel]}>City</Text>
                        {
                            cities.length>0 &&
                            <SelectInput 
                                data={cities}
                                defaultValue={business?.state}
                                style={{
                                    borderWidth:2,
                                    borderColor:"#e0e0e0",
                                    borderTopLeftRadius: 4, 
                                    borderTopRightRadius: 4,
                                    borderBottomLeftRadius: 4, 
                                    borderBottomRightRadius: 4,
                                    borderBottomColor:"#e0e0e0",
                                    borderBottomWidth:2
                                }}
                                labelStyle={{
                                    fontSize: 18
                                }}
                                onChangeItem={(item)=>onSelect("state", item)}
                            />
                        }
                    </View>

                    <View style={styles.rightWrapper}>
                        <Text style={[styles.title, styles.addressLabel]}>Postcode</Text>
                        <TextInput 
                            style={[styles.input, styles.address]} 
                            placeholder="233" 
                            defaultValue={business?.zip_code}
                            onChangeText={(text)=>onChangeText("zip_code", text)}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Phone number</Text>
                <View style={styles.inputWrapper}>
                    <TextInput 
                        style={styles.input} 
                        keyboardType='phone-pad'
                        placeholder="No data" 
                        defaultValue={business?.contact_phone}
                        onChangeText={(text)=>onChangeText("contact_phone", text)}
                    />
                    <Text style={styles.ins}>Tap to edit</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Email Address</Text>
                <View style={styles.inputWrapper}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="No data" 
                        keyboardType='email-address'
                        defaultValue={business?.contact_email}
                        onChangeText={(text)=>onChangeText("contact_email", text)}
                    />
                    <Text style={styles.ins}>Tap to edit</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Website</Text>
                <View style={styles.inputWrapper}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="No data" 
                        keyboardType='url'
                        defaultValue={business?.contact_website}
                        onChangeText={(text)=>onChangeText("contact_website", text)}
                    />
                    <Text style={styles.ins}>Tap to edit</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>About your business</Text>
                <View style={styles.descWrapper}>
                    <TextInput 
                        multiline 
                        style={styles.desc} 
                        placeholder="Tap to add more about your business or what you offer in details..." 
                        defaultValue={business?.about}
                        onChangeText={(text)=>onChangeText("about", text)}
                    />
                </View>
                <Text style={styles.descCount}>300 characters left</Text>
            </View>

            <View style={styles.mapWrapper}>
                <Map 
                    lat={business?.location?.lat}
                    lng={business?.location?.lng}
                />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    section: {
        paddingHorizontal:15,
        borderBottomWidth:1,
        borderBottomColor:"#e0e0e0",
        paddingVertical:15
    },

    select: {
        borderWidth:2,
        borderColor:"#e0e0e0",
        paddingVertical:10,
        paddingHorizontal:10,
        borderRadius:4,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:15
    },

    left: {
        flexDirection:"row",
        alignItems:"center"
    },

    category: {
        fontSize:16,
        marginLeft:10,
        fontFamily: 'Open-Sans'
    },

    desc: {
        paddingVertical:10,
        marginBottom:10,
        fontFamily: 'Open-Sans',
        textAlignVertical:"top"
    },

    descCount: {
        color:"#7536ad",
        fontSize:12,
        alignSelf:"flex-end",
        fontFamily: 'Open-Sans'
    },

    inputRow: {
        flexDirection:"row"
    },

    leftWrapper: {
        width:"60%"
    },

    rightWrapper: {
        width:"37%",
        marginLeft:10
    },

    address: {
        height:50,
        borderWidth:2,
        borderColor:"#e0e0e0",
        paddingHorizontal:10,
        borderRadius:4,
        marginBottom:10
    },

    addressLabel: {
        color:"#cccac4",
        fontFamily: 'Open-Sans'
    },

    mapWrapper: {
        backgroundColor:"#fff",
        marginBottom:50
    },

    title: {
        color:"#7536ad",
        fontSize:12,
        paddingBottom:10,
        fontFamily: 'Open-Sans-Bold'
    },

    input: {
        fontSize:18,
        fontFamily: 'Open-Sans'
    },

    ins: {
        position:"absolute",
        right:0,
        top:10,
        fontSize:12,
        color:"#cccac4",
        fontFamily: 'Open-Sans'
    }
})
