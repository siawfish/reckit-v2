import React from 'react'
import { FlatList } from 'react-native'
import Opening from './Opening'

export default function OpeningHours ({
    openingHours=[],
    onOpeningHoursChange
}) {
    
    const hours = [...openingHours]?.sort((a, b)=>{
        const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
        return days.indexOf(a.day) - days.indexOf(b.day)
    })

    return (
        <FlatList 
            contentContainerStyle={{
                paddingBottom: 100,
                backgroundColor:"#fff"
            }}
            data={hours}
            renderItem={({item})=>{
                return (
                    <Opening 
                        openingHours={item}
                        onOpeningHoursChange={onOpeningHoursChange}
                    />
                )
            }}
            keyExtractor={(item)=>item.day}
        />
    )
}