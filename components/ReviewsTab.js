import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import PostForm from './PostForm';
import ReviewTile from './ReviewTile';
import { useSelector } from 'react-redux'
import { Toast } from 'native-base';
import { API } from '../utils/confiq';

export default function ReviewsTab({
    business,
    refreshBusiness,
    reviews=[]
}){
    const { profile, authToken, isAuthenticated } = useSelector(state=>state.app)
    const [openReviewPost, setOpenReviewPost] = React.useState(false)
    const [review, setReview] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    const onChangeText = (text)=> {
        setReview(text)
    }

    const toggleReviewForm = ()=> {
        setOpenReviewPost(!openReviewPost)
    }

    const onSendReview = async ()=> {
        try {
            setIsLoading(true)
            if(review.length<3){
                Toast.show({
                    text:"Reviews can't be lesser than 4 characters.",
                    duration: 5000,
                    position: "top",
                    type: "danger"
                })
                setIsLoading(false)
                return
            }
            API.setHeader('Authorization', 'Bearer '+authToken)
            let reviewObj = {
                business:business,
                message:review,
                author:{
                    id:profile.id,
                    name:profile.displayName,
                    email:profile.email,
                    avatar:profile.avatar
                }
            }
            const { ok, data, problem } = await API.post("/reviews", reviewObj)
            if(ok){
                setIsLoading(false)
                toggleReviewForm()
                refreshBusiness()
            } else {
                setOpenReviewPost(false)
                Toast.show({
                    text:data.error||problem,
                    duration: 5000,
                    position: "top",
                    type: "danger"
                })
                setIsLoading(false)
            }
        } catch (error) {
            Toast.show({
                text:error.message,
                duration: 5000,
                position: "top",
                type: "danger"
            })
            setIsLoading(false)
        }
    }
    return (
        <View style={styles.sectionWrapper}>
            <Text style={styles.text}>Would you like to give a review?</Text>
            <TouchableOpacity disabled={business?.owner?.id===profile?.id || !isAuthenticated} onPress={toggleReviewForm} style={styles.btn}>
                <Text style={styles.btnText}>Write a review</Text>
            </TouchableOpacity>
            <FlatList
                style={{
                    height: "100%"
                }}
                data={reviews}
                renderItem={({item})=><ReviewTile review={item} />}
                keyExtractor={item=>item.id}
                ListHeaderComponent={<Text style={styles.title}>{reviews?.length} review(s) from customers</Text>}
                ListEmptyComponent={<Text style={{textAlign:"center", paddingVertical:20, fontFamily:"Open-Sans-Bold"}}>No reviews</Text>}
            />
            <PostForm 
                placeholder="Tell others about your experiences..."
                open={openReviewPost}
                defaultValue={review}
                onChangeText={onChangeText}
                onPost={onSendReview}
                user={profile}
                disabled={business?.owner?.id===profile?.id || review==="" || !isAuthenticated}
                isLoading={isLoading}
                onClose={toggleReviewForm}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color:"#7536ad",
        paddingVertical:20,
        fontSize:12,
        fontFamily: 'Open-Sans-Bold'
    },

    sectionWrapper: {
        padding:10,
        borderBottomColor:"#eee",
        borderBottomWidth:1,
        backgroundColor:"#fff"
    },

    text: {
        textAlign:"center",
        paddingVertical:10,
        fontFamily: 'Open-Sans'
    },

    btn: {
        borderWidth:2,
        borderColor:"#7536ad",
        borderRadius:25,
        paddingHorizontal:20,
        paddingVertical:10,
        width:"80%",
        alignSelf:"center"
    },

    btnText: {
        color:"#7536ad",
        textAlign:"center",
        fontFamily: 'Open-Sans-Bold'
    },

    reviewWrapper: {
        paddingVertical:15,
        flexDirection:"row",
        justifyContent:"space-between",
        borderBottomColor:"#eee",
        borderBottomWidth:1
    },

    propic: {
        width:60,
        height:60,
        borderRadius:30,
        marginRight:10
    },

    reviewInfoWrapper: {
        flexDirection:"row"
    },

    reviewInfo: {
        marginHorizontal:8
    },

    review: {
        color:"#f2bc3f",
        marginBottom:10,
        fontFamily: 'Open-Sans-Bold'
    },

    timestamp: {
        color:"grey",
        fontSize:12,
        paddingVertical:5,
        fontFamily: 'Open-Sans'
    }
})
