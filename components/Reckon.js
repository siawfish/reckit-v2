import React from 'react'
import { StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import { Toast } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { API } from '../utils/confiq'
import Question from './Question'
import Reply from './Reply'
import ReckitDetails from './ReckitDetails'
import { updateMyReckits } from '../redux/reckitStore'

export default function Reckon({
    navigation,
    item,
    getMyReckits,
}){
    const { authToken, profile } = useSelector(state=>state.app)
    const [showDetails, setShowDetails] = React.useState(false)
    const [showComment, setShowComment] = React.useState(false)
    const [comment, setComment] = React.useState("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    
    const toggleShowComment = ()=> {
        setShowComment(!showComment)
    }

    const onSubmit = async ()=> {
        try {
            Keyboard.dismiss()
            setIsSubmitting(true)
            API.setHeader('Authorization', `Bearer ${authToken}`)
            const reply = {
                message:comment,
                reckit:item
            }
            const { ok, data, problem } = await API.post('/reply', reply)
            if(ok){
                await getMyReckits()
                setComment("")
                setIsSubmitting(false)
                return true
            } else {
                throw new Error(data.error||problem)
            }
        } catch (error) {
            setIsSubmitting(false)
            Toast.show({
                text:error.message,
                duration: 5000,
                position: "top",
                type: "danger"
            })
            return false
        }
    }

    const toggleDetails = ()=> {
        setShowDetails(!showDetails)
    }

    return (
        <>
            <TouchableOpacity onPress={toggleDetails} style={styles.container}>
                <Question 
                    onDeleteComplete={getMyReckits}
                    item={item} 
                    toggleShowComment={toggleShowComment}
                    commentsCount={item?.comments?.length}
                />
                {
                    showComment &&
                    <Reply 
                        user={profile}
                        defaultValue={comment}
                        item={item}
                        onSubmit={onSubmit}
                        isSubmitting={isSubmitting}
                        onChangeText={(text)=>setComment(text)}
                        toggleDetails={toggleDetails}
                    />
                }
            </TouchableOpacity>
            <ReckitDetails 
                user={profile}
                open={showDetails}
                item={item}
                commentsCount={item?.comments?.length}
                onClose={toggleDetails}
                comments={item?.comments}
                onSubmit={onSubmit}
                defaultComment={comment}
                isSubmitting={isSubmitting}
                onChangeText={(text)=>setComment(text)}
                onDeleteComplete={getMyReckits}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#fff",
        marginBottom:2,
        borderBottomColor:"#eee",
        borderBottomWidth:1,
        paddingHorizontal:16,
    }
})
