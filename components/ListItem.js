import React from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons';
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'

var isBetween = require('dayjs/plugin/isBetween')
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
dayjs.extend(isBetween)

const date = new Date()

export default function ListItem({
    business,
    navigation,
    style
}){
    const { location } = useSelector(state=>state.app)
    const today = date.toDateString()
    const dayArr = today.split(' ')
    const format = 'MM/DD/YY HH:mm'

    const opening = business?.business_hours.find(time=>{
        return time.day==dayArr[0].toLowerCase()
    })

    const openingHour = opening?.open
    const closingHour = opening?.close
    const status = opening?.status

    function convertTo24Hour(timeStr) {
        let [time, modifier] = timeStr.split(' ');
    
        let [hours, minutes] = time.split(':');
    
        if (hours === '12') {
            hours = '00';
        }
    
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        let date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date;
    }

    const isCurrentTimeBetweenOpeningClosing = (timeInfo) => {
        const now = new Date();
        if (!timeInfo?.openingHour || !timeInfo?.closingHour || !timeInfo?.status) return false;
        const openingHour = convertTo24Hour(timeInfo?.openingHour);
        const closingHour = convertTo24Hour(timeInfo?.closingHour);
        if (now > openingHour && now < closingHour) {
            if(timeInfo?.status?.toString()==="1"){
                return true;
            }
        }
        return false;
    }

    const isOpened = isCurrentTimeBetweenOpeningClosing({
        openingHour,
        closingHour,
        status
    })

    const haversine_distance = (mk1, mk2) => {
        var R = 3958.8; // Radius of the Earth in miles
        var rlat1 = mk1?.lat * (Math.PI/180); // Convert degrees to radians
        var rlat2 = mk2?.lat * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (mk2?.lng-mk1?.lon) * (Math.PI/180); // Radian difference (longitudes)
  
        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d;
    }
    
    return (
        <TouchableOpacity 
            onPress={()=>navigation.navigate("Business Details", {
                bid:business?.id, 
                distance:business?.distance
            })} 
            style={[styles.listItem, style]}
        >
            <View style={styles.imageContainer}>
                {
                    !business?.photos ? 
                    <Ionicons name="ios-images" size={24} color="#fff" /> :
                    <Image 
                        style={{
                            width:"100%",
                            height:"100%",
                            borderTopLeftRadius:6,
                            borderBottomLeftRadius:6
                        }} 
                        source={{uri:business?.photos[0]}} 
                    />
                }
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.topSection}>
                    <View style={styles.titleRow}>
                        <Text numberOfLines={2} style={styles.title}>{business.name}</Text>
                        {
                            isOpened ? <Text style={styles.open}>Open</Text>:
                            <Text style={styles.close}>Closed</Text>
                        }
                    </View>
                    <View style={styles.searchRow}>
                        <Text style={styles.search}>{business?.category} | {location&&haversine_distance(location, business?.location).toFixed(1)} km</Text>
                    </View>
                    <View style={styles.workingHoursRow}>
                        <Text style={styles.workingHors}><Feather name="clock" size={14} color="black" /> Opening Hours {openingHour} - {closingHour}</Text>
                    </View>
                </View>
                <View style={styles.descRow}>
                    <Text numberOfLines={1} style={{fontFamily: 'Open-Sans'}}>{business?.about}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection:"row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:"#fff",
        borderRadius:6,
        marginVertical:10,
        height:120
    },

    topSection: {
        marginBottom:8
    },

    imageContainer: {
        width:"25%",
        backgroundColor:"#eee",
        justifyContent:"center",
        alignItems:"center",
        borderTopLeftRadius:6,
        borderBottomLeftRadius:6,
        height:120
    },

    infoContainer: {
        padding:15,
        justifyContent:"space-between",
        width:"75%"
    },

    titleRow: {
        flexDirection:"row",
        justifyContent:"space-between",
        paddingBottom:5
    },

    close: {
        color:"red",
        fontSize:12,
        width:"20%",
        textAlign:"right",
        fontFamily: 'Open-Sans'
    },

    open: {
        color:"#76a803",
        fontSize:12,
        width:"20%",
        textAlign:"right",
        fontFamily: 'Open-Sans'
    },

    title: {
        color:"#7536ad",
        fontSize:15,
        width:"80%",
        fontFamily: 'Open-Sans-Bold'
    },

    searchRow: {
        paddingBottom:5
    },

    search: {
        color:"#ffa300",
        fontFamily: 'Open-Sans-Bold',
        fontSize:11
    },

    workingHoursRow: {
        paddingBottom:5
    },

    workingHors: {
        fontFamily: 'Open-Sans-Bold',
        fontSize:11
    }
})
