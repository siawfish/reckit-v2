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
    item
}){
    const dispatch = useDispatch()
    const { authToken, profile } = useSelector(state=>state.app)
    const [showDetails, setShowDetails] = React.useState(false)
    const [showComment, setShowComment] = React.useState(false)
    const [comments, setComments] = React.useState(item?.comments)
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
                if(comments?.length<1){
                    setComments([data.reply])
                } else {
                    setComments([...comments, data.reply])
                    dispatch(updateMyReckits({
                        ...item,
                        comments:[...comments, data.reply]
                    }))
                }
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
            <TouchableOpacity onPress={toggleDetails} style={styles.conatiner}>
                <Question 
                    item={item} 
                    toggleShowComment={toggleShowComment}
                    commentsCount={comments?.length}
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
                commentsCount={comments?.length}
                onClose={toggleDetails}
                comments={comments}
                onSubmit={onSubmit}
                defaultComment={comment}
                isSubmitting={isSubmitting}
                onChangeText={(text)=>setComment(text)}
            />
        </>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor:"#fff",
        borderRadius:8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding:5,
        marginBottom:10
    }
})
