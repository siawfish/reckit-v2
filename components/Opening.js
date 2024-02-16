import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import OpenStatus from './OpenStatus'
import dayjs from 'dayjs'
import DateTimePicker from "@react-native-community/datetimepicker";

const TIME = new Date

export default function Opening({
    openingHours,
    onOpeningHoursChange
}) {
    const [showClock, setShowClock] = React.useState(false)
    const [showClock1, setShowClock1] = React.useState(false)
    const [state, setState] = React.useState(openingHours)


    const onPickTime = (event, date, name) => {
        if(event.type==="dismissed"){
            setShowClock1(false)
            setShowClock(false)
            return
        } else {
            setState({
                ...state,
                [name]: dayjs(date).format('hh:mm A')
            })
            setShowClock1(false)
            setShowClock(false)
        }
    }

    const onStatusChange = (name, value)=> {
        setState({
            ...state,
            [name]: value
        })
        setShowClock1(false)
        setShowClock(false)
    }

    React.useEffect(()=>{
        onOpeningHoursChange(state)
    },[state])

    const renderTimePicker = (type)=> {
        return (
            <DateTimePicker 
                isVisible
                value={TIME}
                mode="time"
                display="spinner"
                themeVariant="light"
                is24Hour={false}
                onChange={(event, date)=>onPickTime(event, date, type)}
            />
        )
    }

    return (
        <>
        <View style={styles.section}>
            <View style={styles.row}>
                <Text style={styles.day}>{state.day}.</Text>
                <OpenStatus onChange={onStatusChange} status={state.status} />
            </View>
            <View style={styles.row}>
                <Text style={[styles.duration]}>From</Text>
                <TouchableOpacity 
                    disabled={state.status?.toString()==='0'} 
                    onPress={()=>setShowClock(true)} 
                    style={[
                        styles.timeBtn, 
                        state.status?.toString()==='0' && styles.disabledTimeBtn
                    ]}
                >
                    <Text style={styles.time}>{state.open}</Text>
                    <AntDesign name="down" size={15} color="#7536ad" />
                </TouchableOpacity>
                <Text style={styles.toDuration}>To</Text>
                <TouchableOpacity 
                    disabled={state.status?.toString()==='0'} 
                    onPress={()=>setShowClock1(true)} 
                    style={[
                        styles.timeBtn, 
                        state.status?.toString()==='0' && 
                        styles.disabledTimeBtn
                    ]}
                >
                    <Text style={styles.time}>{state.close}</Text>
                    <AntDesign name="down" size={15} color="#7536ad" />
                </TouchableOpacity>
            </View>
        </View>
        {
            showClock &&
            renderTimePicker("open")
        }
        {
            showClock1 &&
            renderTimePicker("close")
        }
        </>
    )
}

const styles = StyleSheet.create({
    section: {
        paddingHorizontal:15,
        borderBottomWidth:1,
        borderBottomColor:"#e0e0e0",
        paddingVertical:15
    },

    row: {
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:5
    },

    day: {
        width:"20%",
        fontSize:18,
        color:"#ffa300",
        textTransform:"capitalize",
        fontFamily: 'Open-Sans-Bold'
    },

    timeBtn: {
        flexDirection:"row",
        alignItems:"center",
        borderWidth:1,
        borderColor:"#e0e0e0",
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:5
    },

    disabledTimeBtn: {
        backgroundColor:"#e0e0e0",
    },

    time: {
        paddingRight:10,
        fontFamily: 'Open-Sans'
    },

    duration: {
        color:"#8a8986",
        width:"20%",
        fontFamily: 'Open-Sans'
    },

    toDuration: {
        color:"#8a8986",
        fontFamily: 'Open-Sans',
        marginHorizontal:20
    }
})
