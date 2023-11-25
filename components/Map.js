import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

export default function Map({
    lat=5.6037,
    lng=-0.1870
}) {
    return (
        <MapView 
            style={styles.mapStyle}
            scrollEnabled={false}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.042
            }}
        >
            <Marker 
                pinColor="#7536ad"
                coordinate={{
                    latitude: lat,
                    longitude: lng
                }}
            />
        </MapView>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width:"100%",
        height:150
    }
})
