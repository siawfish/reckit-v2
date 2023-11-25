import React from 'react'
import AuthForm from './AuthForm'

export default function Register({
    navigation
}) {
    
    const gotoLogin = ()=> {
        navigation.goBack()
    }

    const onCancel = ()=> {
        navigation.navigate('Tabs', {
            screen:"NearMe"
        })
    }

    return (
        <AuthForm 
            onCancel={onCancel}
            gotoLogin={gotoLogin}
            navigation={navigation}
        />
    )
}
