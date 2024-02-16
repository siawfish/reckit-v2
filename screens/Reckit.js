import React from 'react'
import { Text, StyleSheet, View, Dimensions, Image, ActivityIndicator, FlatList } from 'react-native'
import Reckon from '../components/Reckon'
import propic from '../assets/propic.jpeg'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import PostForm from '../components/PostForm'
import { useSelector, useDispatch } from 'react-redux'
import FloatingButton from '../components/FloatingButton'
import { Toast } from 'native-base'
import { API } from '../utils/confiq'
import { addReckits, setReckits, addMyReckits } from '../redux/reckitStore'
import NoListing from '../components/NoListing'

const windowHeight = Dimensions.get('window').height
const delay = 60

export default function Reckit({
    navigation
}) {
    const dispatch = useDispatch()
    const { profile, authToken } = useSelector(state=>state?.app)
    const { reckits } = useSelector(state=>state.reckit)
    const [openPost, setOpenPost] = React.useState(false)
    const [refreshing, setRefreshing] = React.useState(false)
    const [reckit, setReckit] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(true)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    React.useEffect(()=>{
        getReckits()
    },[])

    const getReckits = async()=> {
        try {
            setRefreshing(true)
            const { ok, data, problem } = await API.get('/reckits')
            if(ok){
                const reckits = data.reverse()
                dispatch(setReckits(reckits))
            } else {
                Toast.show({
                    text:data.error||problem,
                    duration: 5000,
                    position: "top",
                    type: "danger"
                })
            }
            setIsLoading(false)
            setRefreshing(false)
        } catch (error) {
            Toast.show({
                text:error?.message,
                duration: 5000,
                position: "top",
                type: "danger"
            })
            setIsLoading(true)
            setRefreshing(false)
        }
    }

    const postReckit = async()=> {
        try {
            setIsSubmitting(true)
            API.setHeader('Authorization', `Beaerer ${authToken}`)
            const { ok, data, problem } = await API.post('/reckits', {message:reckit})
            if(ok){
                dispatch(addReckits({
                    ...data.reckit,
                    comments:[]
                }))
                dispatch(addMyReckits({
                    ...data.reckit,
                    comments:[]
                }))
                Toast.show({
                    text:"Reckit sent!",
                    duration: 5000,
                    position: "top",
                    type: "success"
                })
                setReckit("")
                setOpenPost(false)
            } else {
                throw new Error(data.error || problem)
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

    return (
        <View style={{flex:1}}>
            <View contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.headerSection}>
                    <LinearGradient
                        colors={['transparent', '#f7702d']}
                        style={styles.gradientView}
                        start={{ 
                            x: 0.02, 
                            y: 1
                        }}
                        end={{
                            x: 1, 
                            y: 0.02
                        }}
                    >
                        <Image source={profile?.avatar ? {uri:profile?.avatar} : propic} style={styles.propic} />
                        <Text style={styles.name}>{profile?.displayName}</Text>
                        <Text style={styles.text}>{profile?.email}</Text>
                    </LinearGradient>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Reckits</Text>
                    <View style={styles.underline}></View>
                    {
                        isLoading ?
                        <View style={styles.loaderWrapper}>
                            <ActivityIndicator size="small" color="#7536ad" />
                        </View> :
                        <FlatList
                            data={reckits}
                            onRefresh={()=>getReckits()}
                            refreshing={refreshing}
                            keyExtractor={item=>item.id}
                            renderItem={({item})=><Reckon getMyReckits={getReckits} navigation={navigation} item={item} />}
                            contentContainerStyle={{paddingVertical:20}}
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
                </View>
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
            </View>
            <FloatingButton 
                icon={<FontAwesome name="pencil" size={24} color="white" />}
                onPress={()=>setOpenPost(true)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff"
    },

    loaderWrapper: {
        flex:1, 
        justifyContent:"center", 
        alignItems:"center"
    },

    headerSection: {
        height:windowHeight/4,
        backgroundColor:"#7536ad"
    },

    gradientView: {
        paddingTop:40,
        flex:1,
        borderBottomLeftRadius:250,
        alignItems:"center",
        justifyContent:"center"
    },

    text: {
        color:"#fff",
        paddingBottom:10,
        fontFamily: 'Open-Sans',
        marginBottom:10
    },

    name: {
        fontSize:18,
        color:"#fff",
        paddingTop:10,
        fontFamily: 'Open-Sans-Bold',
        textTransform:"capitalize"
    },

    propic: {
        width:80,
        height:80,
        borderRadius:40
    },

    content: {
        position:"relative",
        height: "72%"
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

    addReckon: {
        backgroundColor:"#7536ad",
        width:60,
        height:60,
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position:"absolute",
        bottom:50,
        right:20,
        zIndex:2
    },

    postReckonWrapper: {
        padding:15,
        backgroundColor:"#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:4,
        flex:1
    },

    propicSmall: {
        width:50,
        height:50,
        borderRadius:25,
        marginRight:10
    },

    inputRow: {
        flexDirection:"row",
        flex:1,
        // paddingBottom:10
    },

    input: {
        backgroundColor: "#eee",
        flex:1,
        borderRadius:4,
        paddingHorizontal:10,
        paddingVertical:8,
        height:80,
        textAlignVertical:'top'
    },

    btnRow: {
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center"
    },

    postBtn: {
        backgroundColor: "#7536ad",
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:25,
        flexDirection:"row",
        alignItems:"center"
    },

    post: {
        color:"#fff",
        fontFamily: 'Open-Sans-Bold'
    }
})
