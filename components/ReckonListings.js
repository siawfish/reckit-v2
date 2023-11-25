import React from 'react'
import { Text, StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import Reckon from './Reckon'
import { useDispatch, useSelector } from 'react-redux'
import NoListing from './NoListing'
import { FontAwesome } from '@expo/vector-icons'
import { Toast } from 'native-base'
import { API } from '../utils/confiq'
import { addReckits, setMyReckits, addMyReckits } from '../redux/reckitStore'
import FloatingButton from './FloatingButton'
import PostForm from './PostForm'

const delay = 60

export default function ReckonListings({
    navigation
}){
    const [isLoading, setIsLoading] = React.useState(true)
    const dispatch = useDispatch()
    const { authToken, profile } = useSelector(state=>state.app)
    const { myReckits } = useSelector(state=>state.reckit)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [refreshing, setRefreshing] = React.useState(false)
    const [reckit, setReckit] = React.useState("")
    const [openPost, setOpenPost] = React.useState(false)

    React.useEffect(()=>{
        getMyReckits()
    },[])


    React.useEffect(()=>{
        let timer = setTimeout(
            () => getMyReckits(), delay * 1000
        )
        return () => {
          clearTimeout(timer);
        };
    },[])

    const postReckit = async()=> {
        try {
            setIsSubmitting(true)
            API.setHeader('Authorization', `Beaerer ${authToken}`)
            const { ok, data, problem } = await API.post('reckits', {message:reckit})
            if(ok){
                Toast.show({
                    text:"Reckit sent!",
                    duration: 5000,
                    position: "top",
                    type: "success"
                })
                dispatch(addReckits({
                    ...data.reckit,
                    comments:[]
                }))
                dispatch(addMyReckits({
                    ...data.reckit,
                    comments:[]
                }))
                setOpenPost(false)
                setReckit("")
            } else {
                Toast.show({
                    text:data?.error || problem,
                    duration: 5000,
                    position: "top",
                    type: "danger"
                })
            }
            setIsSubmitting(false)
        } catch (error) {
            Toast.show({
                text:error.message,
                duration: 5000,
                position: "top",
                type: "danger"
            })
            setIsSubmitting(false)
        }
    }

    const onChangeText = (text)=> {
        setReckit(text)
    }

    const getMyReckits = async ()=> {
        try {
            setRefreshing(true)
            API.setHeader("Authorization", `Bearer ${authToken}`)
            const { ok, data, problem } = await API.get('/me/reckits')
            if(ok){
                const myReckits = data.reverse()
                dispatch(setMyReckits(myReckits))
                setRefreshing(false)
                setIsLoading(false)
            } else {
                throw new Error(data?.error || problem)
            }
        } catch (error) {
            Toast.show({
                text:error.message,
                duration: 5000,
                position: "top",
                type: "danger"
            })
            setIsLoading(false)
            setRefreshing(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Reckits</Text>
            <View style={styles.underline}></View>
            {
                isLoading ?
                <View style={styles.loaderWrapper}>
                    <ActivityIndicator size="small" color="#7536ad" />
                </View> :
                <FlatList 
                    data={myReckits}
                    renderItem={({item})=><Reckon navigation={navigation} item={item} />}
                    refreshing={refreshing}
                    onRefresh={()=>getMyReckits()}
                    key={item=>item.id}
                    contentContainerStyle={{paddingHorizontal:20, paddingVertical:20}}
                    ListEmptyComponent={
                        <NoListing 
                            title="Have any experiences you'd like to share?" 
                            caption="Share your first experiences with other businesses"
                            icon={<FontAwesome name="times-circle"  size={80} color="grey" />}
                            showButton={false}
                        />
                    }
                />
            }
            <PostForm
                open={openPost}
                maxLength={300}
                defaultValue={reckit}
                onChangeText={onChangeText}
                user={profile}
                isLoading={isSubmitting}
                onClose={()=>setOpenPost(false)}
                disabled={reckit===""}
                onPost={postReckit}
            />
            <FloatingButton 
                icon={<FontAwesome name="pencil" size={24} color="white" />}
                onPress={()=>setOpenPost(true)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical:20,
        backgroundColor:"#fff",
        flex:1
    },

    title: {
        color:"#7536ad",
        paddingTop:10,
        fontSize:25,
        fontFamily: 'Open-Sans-Bold',
        paddingLeft:20
    },

    underline: {
        width:40,
        height:4,
        backgroundColor:"#ffa300",
        marginTop:10,
        marginLeft:20
    },

    loaderWrapper: {
        flex:1, 
        justifyContent:"center", 
        alignItems:"center"
    }
})
