import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MaterialIcons, FontAwesome, FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons'

export default function CategoryIcon({
    type
}){
    const renderIcon = (type) => {
        switch (type?.toLowerCase()) {
            case "food_restaurant":
                return <MaterialIcons name="restaurant-menu" size={18} color="white" />
            case "bar_nightlife":
                return <FontAwesome5 name="glass-cheers" size={18} color="white" />
            case "small_business":
                return <MaterialIcons name="business-center" size={18} color="white" />
            case "accommodation":
                return <FontAwesome name="bed" size={18} color="white" />
            case "tour_activity":
                return <MaterialCommunityIcons name="swim" size={18} color="white" />
            case "more":
                return <Feather name="more-horizontal" size={35} color="grey" />
            case "event":
                return <FontAwesome name="calendar-check-o" size={18} color="white" />
            case "beauty_spa":
                return <FontAwesome5 name="cut" size={18} color="white" />
            default:
                return <FontAwesome5 name="cut" size={18} color="white" />
            break;
        }
    }
    return (
        <View 
            style={[
                styles.container, 
                type?.toLowerCase().match("restaurant") && styles.restaurant,
                type?.toLowerCase().match("bar") && styles.bar,
                type?.toLowerCase().match("business") && styles.business,
                type?.toLowerCase().match("accommodation") && styles.accommodation,
                type?.toLowerCase().match("tour") && styles.tour,
                type?.toLowerCase().match("event") && styles.event,
                type?.toLowerCase().match("beauty") && styles.beauty,
                type?.toLowerCase().match("more") && styles.more
            ]}
        >
            {
                renderIcon(type)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:35,
        height:35,
        borderRadius:17.5,
        justifyContent:"center",
        alignItems:"center"
    },

    restaurant: {
        backgroundColor:"#F4C63A"
    },

    bar: {
        backgroundColor:"#B269F6"
    },

    business: {
        backgroundColor:"#FC4A83"
    },

    accommodation: {
        backgroundColor:"#5AC7FD"
    },

    tour: {
        backgroundColor:"#58E2C2"
    },

    event: {
        backgroundColor:"#FC4F4F"
    },

    beauty: {
        backgroundColor:"#FC4AB4"
    }
})
