import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Animated } from 'react-native'
import logo from '../assets/ic_logo.png'
import Swiper from 'react-native-swiper'
import dot from '../assets/page_inactive.png'
import activeDot from '../assets/page_active.png'
import phone from '../assets/s8_image.png'
import group from '../assets/groupIcon.png'
import * as Animatable from 'react-native-animatable';
import cr1 from '../assets/cr1.png'
import cr2 from '../assets/cr2.png'
import cr3 from '../assets/cr3.png'
import Carousel from 'react-native-snap-carousel';
import bgImage from '../assets/food_salad_dinner_eating.png'
import chatRight from '../assets/bgRight.png'
import chatLeft from '../assets/bgLeft.png'
import propic1 from '../assets/propic1.png'
import propic2 from '../assets/propic2.png'
import { useDispatch } from 'react-redux'
import { setShowOnboarding } from '../redux/appStore'

const { width, height } = Dimensions.get("window")

export default function Welcome({
    navigation
}) {
    const dispatch = useDispatch()

    React.useEffect(()=>{
        const timeout = setTimeout(() => {
            move()
        }, 3000)
        return () => {
            clearTimeout(timeout);
        }
    }, [])

    const moveLeft = React.useRef(new Animated.Value(0)).current
    const carousel = React.useRef(null)

    const move = () => {
        Animated.timing(moveLeft, {
            toValue: -80,
            duration: 2000,
            useNativeDriver:false
        }).start();
    }

    const fadeIn = {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
    }

    const images = [
        cr2,
        cr1,
        cr3
    ]

    const snapTo = (number)=> {
        carousel.current.snapToItem(number)
    }

    const renderImage = (item, index)=> {
        return (
            <TouchableOpacity onPress={()=>snapTo(index)} style={styles.carouselImageWrapper}>
                <Image style={styles.carouselImage} source={item} />
            </TouchableOpacity>
        )
    }

    const gotoProfile = ()=> {
        dispatch(setShowOnboarding(false))
        navigation.navigate("Tabs",{screen:"Profile", params:{type:"register"}})
    }

    const gotoNearMe = ()=> {
        dispatch(setShowOnboarding(false))
        navigation.navigate("Tabs",{screen:"NearMe"})    
    }

    return (
        <View style={styles.container}>
            <Swiper 
                dot={<Image style={styles.dot} source={dot} />}
                activeDot={<Image style={styles.activeDot} source={activeDot} />}
                dotStyle={styles.dotStyle}
                loadMinimal={true}
                loadMinimalSize={0}
            >
                {/* Slide 1 */}
                <View style={styles.slide}>
                    <>
                        <View style={styles.imgWrapper}>
                            <Image style={styles.logo} source={logo} />
                        </View>
                        <Animated.Image 
                            style={[styles.phoneImage, {marginLeft:moveLeft}]} 
                            source={phone} 
                        />
                        <Animatable.View delay={4000} animation={fadeIn} style={[styles.sideWrapper]}>
                            <Image style={styles.sideImage} source={group} />
                        </Animatable.View>
                    </>
                    <Text style={styles.caption}>Search for everything great in your town.</Text>
                </View>
                {/* Slide 2 */}
                <View style={styles.slide}>
                    <>
                        <View style={styles.imgWrapper}>
                            <Image style={styles.logo} source={logo} />
                        </View>
                        <Carousel
                            layout={"default"}
                            activeSlideAlignment='center'
                            autoplay
                            loop
                            ref={carousel}
                            data={images}
                            sliderWidth={width}
                            itemWidth={200}
                            renderItem={({item, index})=>renderImage(item, index)}
                        />
                    </>
                    <Text style={styles.caption}>Great tips and reviews from locals and tourists.</Text>
                </View>
                {/* Slide 3 */}
                <View style={{height:"100%"}}>
                    <View style={{height:"50%"}}>
                        <View style={styles.bgWrapper}>
                            <Image style={styles.bg} source={bgImage} />
                        </View>
                        <View style={styles.imgWrapper}>
                            <Image style={styles.logo} source={logo} />
                        </View>

                        <Animatable.View duration={2000} animation={fadeIn} style={[styles.chatbox]}>
                            <View style={styles.moveRight}>
                                <Image source={chatRight} style={styles.chat} />
                                <Image source={propic1} style={styles.propic} />
                                <View style={styles.infoWrapper}>
                                    <Text style={styles.upText}>Anatasia <Text style={styles.greyText}>retweeted</Text> Resturant</Text>
                                    <Text style={styles.info}>"The best place to try</Text>
                                    <Text style={styles.info}>local food! Great food..."</Text>
                                </View>
                            </View>
                        </Animatable.View>

                        <Animatable.View delay={2000} duration={2000} animation={fadeIn} style={[styles.chatbox, {marginTop:30}]}>
                            <View style={styles.moveLeft}>
                                <Image source={chatLeft} style={styles.chat} />
                                <Image source={propic2} style={styles.propic} />
                                <View style={styles.infoWrapper}>
                                    <Text style={styles.upText}>Carlos <Text style={styles.greyText}>retweeted</Text> Resturant</Text>
                                    <Text style={[styles.info]}>"Excellent food with real</Text>
                                    <Text style={[styles.info]}>local taste. I would defi..."</Text>
                                </View>
                            </View>
                        </Animatable.View>
                        
                    </View>
                    <View>
                        <Text style={[styles.caption, {marginTop:60}]}>Share your thoughts with the community.</Text>
                    </View>
                </View>

            </Swiper>
            <View style={styles.btnWrapper}>
                <TouchableOpacity onPress={gotoProfile} style={styles.btn}>
                    <Text style={styles.btnText}>Register now</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={gotoNearMe} style={styles.btn}>
                    <Text style={styles.btnText}>Skip</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff"
    },

    dot: {
        width:15,
        height:15,
        marginHorizontal:15
    },

    activeDot: {
        width:25,
        height:25,
        marginHorizontal:15
    },

    imgWrapper: {
        marginTop:50,
        marginBottom:30,
        marginHorizontal:20
    },

    phoneImage: {
        width:width-80,
        height:height/2.5,
        resizeMode:"contain",
        alignSelf:"center"
    },

    logo: {
        width:75,
        height:21
    },

    btnWrapper: {
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        paddingVertical:40
    },

    btn: {
        borderWidth:2,
        borderColor:"#7536ad",
        marginHorizontal:20,
        paddingVertical:15,
        borderRadius:30,
        flex:1
    },

    btnText: {
        color:"#7536ad",
        fontFamily:"Open-Sans-Bold",
        textAlign:"center"
    },

    sideWrapper: {
        width:width/2.8,
        position:"absolute",
        top:height/5,
        right:30
    },

    sideImage: {
        width:"100%",
        resizeMode:"contain"
    },

    carouselImage: {
        width:"100%", 
        resizeMode:"contain",
        height: 250
    },

    bg: {
        width:"100%",
        resizeMode:"contain",
        height:height/1.8
    },

    bgWrapper: {
        position:"absolute",
        top:-50,
        left:0,
        right:0,
        bottom:0
    },

    chatbox: {
        position:"relative",
        height:100
    },

    chat: {
        width: "100%",
        height:100,
        resizeMode:"contain",
        position:"absolute",
        top:0,
        left:0,
        right:0
    },

    moveLeft: {
        position:"absolute",
        top:0,
        left:0,
        flexDirection:"row",
        alignItems:"center",
        padding:"5%",
        width:width/1.5
    },

    moveRight: {
        position:"absolute",
        top:0,
        right:"-7%",
        flexDirection:"row",
        alignItems:"center",
        padding:"5%",
        width:width/1.5
    },

    propic: {
        width:40,
        height:40,
        borderRadius:25,
        marginLeft:10
    },

    infoWrapper: {
        flexDirection:"column",
        paddingHorizontal:5
    },

    upText: {
        fontSize:11,
        marginBottom:10,
        color:"#7536ad",
        fontFamily:"Open-Sans"
    },

    greyText: {
        color:"#999999"
    },

    info: {
        fontSize:13,
        color:"hotpink",
        fontFamily:"Open-Sans"
    },

    caption: {
        fontFamily:"Open-Sans-Bold",
        color:"#ffa300",
        fontSize:30,
        fontWeight:"700",
        paddingHorizontal:20,
        textAlign:"center",
        marginTop:40
    }
})
