import React from 'react'
import { FlatList, View } from 'react-native'
import Opening from './Opening'

export default function OpeningHours ({
    openingHours=[],
    onOpeningHoursChange
}) {
    let hours = []
    openingHours.forEach(opening=>{
        if(opening.day==="mon"){
            hours[0]=opening
        }
        if(opening.day==="tue"){
            hours[1]=opening
        }
        if(opening.day==="wed"){
            hours[2]=opening
        }
        if(opening.day==="thu"){
            hours[3]=opening
        }
        if(opening.day==="fri"){
            hours[4]=opening
        }
        if(opening.day==="sat"){
            hours[5]=opening
        }
        if(opening.day==="sun"){
            hours[6]=opening
        }
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