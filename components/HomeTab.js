import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Linking, FlatList, Platform, Alert, ScrollView } from 'react-native'
import CategoryIcon from '../components/CategoryIcon'
import { AntDesign } from '@expo/vector-icons'
import ReviewTile from './ReviewTile'
import { categories } from '../utils/confiq'
import Map from './Map'
import dayjs from 'dayjs'

const date = new Date()

export default function HomeTab({
    business,
    navigation,
    reviews=[]
}){
    const [showOpeningHours, setShowOpeningHours] = React.useState(false)
    const today = date.toDateString()
    const dayArr = today.split(' ')
    const format = 'MM/DD/YY HH:mm'

    const opening = business?.business_hours?.find(time=>{
        return time.day==dayArr[0].toLowerCase()
    })

    const openingHour = opening?.open
    const closingHour = opening?.close
    const status = opening?.status

    function convertTo24Hour(timeStr) {
        let [time, modifier] = timeStr.split(' ');
    
        let [hours, minutes] = time.split(':');
    
        if (hours === '12') {
            hours = '00';
        }
    
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        let date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date;
    }

    const isCurrentTimeBetweenOpeningClosing = (timeInfo) => {
        const now = new Date();
        if (!timeInfo?.openingHour || !timeInfo?.closingHour || !timeInfo?.status) return false;
        const openingHour = convertTo24Hour(timeInfo.openingHour);
        const closingHour = convertTo24Hour(timeInfo.closingHour);
        if (now > openingHour && now < closingHour) {
            return true;
        }
        return false;
    }

    const isOpened = isCurrentTimeBetweenOpeningClosing({
        openingHour,
        closingHour,
        status
    })

    const toggleShowOpeningHours = ()=> {
        setShowOpeningHours(!showOpeningHours)
    }

    const categoryItem = categories?.filter(category=>{
        return category.name == business?.category
    })

    const gotoMaps = ()=>{
        const url = Platform.select({
            ios: `maps:0,0?q=${business.location.lat},${business.location.lng}`,
            android: `geo:0,0?q=${business.location.lat},${business.location.lng}`,
        })
        
        Linking.openURL(url)
    }

    const call = ()=> {
        let phoneNumber = '';
        if (Platform.OS === 'android'){ 
            phoneNumber = `tel:${business?.contact_phone}`; 
        } else {
            phoneNumber = `telprompt:${business?.contact_phone}`; 
        }
        Linking.openURL(phoneNumber);
    }

    const email = ()=> {
        Linking.openURL(`mailto:${business?.contact_email}`)
    }

    const gotoWebsite = ()=> {
        Linking.canOpenURL(business?.contact_website).then(supported => {
            if (supported) {
              Linking.openURL(`https://${business?.contact_website}`);
            } else {
              Alert.alert("No default browser", "Set a default browser to open link.")
            }
        });
    }

    const sortedOpeningHours = business?.business_hours?.sort((a, b)=>{
        const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
        return days.indexOf(a.day) - days.indexOf(b.day)
    })

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.sectionWrapper}>
                <Text style={styles.title}>About this place</Text>
                <View style={styles.openingHoursWrapper}>
                    <View style={styles.statusWrapper}>
                        {
                            isOpened ? 
                            <>
                                <View style={[styles.dot, {backgroundColor:"#76a803"}]}></View>
                                <Text style={[styles.status, {color:"#76a803"}]}>Open now</Text>
                            </> :
                            <>
                                <View style={styles.dot}></View>
                                <Text style={styles.status}>Closed now</Text>
                            </>
                        }
                    </View>
                    <TouchableOpacity onPress={toggleShowOpeningHours} style={styles.toggleWrapper}>
                        <Text style={styles.toggleText}>see opening hours</Text>
                        {
                            showOpeningHours ? 
                            <AntDesign name="up" size={12} color="#7536ad" /> :
                            <AntDesign name="down" size={12} color="#7536ad" />
                        }
                    </TouchableOpacity>
                </View>
                {
                    showOpeningHours &&
                    <View style={styles.openingTimesWrapper}>
                        <Text style={[styles.title, {paddingBottom:8}]}>Opening hours</Text>
                        {
                            sortedOpeningHours?.map((timeObj, i)=>{
                                return(
                                    <View key={i} style={styles.timeWrapper}>
                                        <Text style={styles.day}>{timeObj.day}.</Text>
                                        <Text style={styles.time}>{timeObj.open} - {timeObj.close}</Text>
                                    </View>
                                ) 
                            })
                        }
                    </View>
                }
            </View>
            <View style={styles.sectionWrapper}>
                <View style={styles.categoryWrapper}>
                    <CategoryIcon type={categoryItem?.[0]?.key} />
                    <View style={styles.categoryInfo}>
                        <Text style={styles.category}>{business?.category}</Text>
                        <Text style={{fontFamily: 'Open-Sans', width:"95%"}}>
                            {business.description==null ? "No data" : business.description}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.sectionWrapper}>
                <Text style={styles.title}>Location</Text>
                <View style={styles.locationWrapper}>
                    <Text style={{fontFamily: 'Open-Sans', width:"65%"}}>{business.address}</Text>
                    <TouchableOpacity onPress={gotoMaps} style={styles.btn}>
                        <Text style={styles.btnText}>Get Direction</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.mapWrapper}>
                <Map 
                    lat={business.location?.lat}
                    lng={business.location?.lng}
                />
            </View>
            <View style={styles.sectionWrapper}>
                <Text style={styles.title}>Contact Info</Text>
                <View style={styles.contactWrapper}>
                    <Text style={styles.contactTextLeft}>{business.contact_phone==null ? "No Data" : business.contact_phone}</Text>
                    <Text onPress={call} style={styles.contactTextRight}>Call Now</Text>
                </View>
            </View>
            <View style={styles.sectionWrapper}>
                <View style={[styles.contactWrapper, {marginTop:10}]}>
                    <Text style={styles.contactTextLeft}>{business.contact_email==null ? "No Data" : business.contact_email}</Text>
                    <Text onPress={email} style={styles.contactTextRight}>Send Email</Text>
                </View>
            </View>
            <View style={styles.sectionWrapper}>
                <View style={[styles.contactWrapper, {marginTop:10}]}>
                    <Text style={styles.contactTextLeft}>{business.contact_website==null ? "No Data" : business.contact_website}</Text>
                    <Text onPress={gotoWebsite} style={styles.contactTextRight}>Open Web</Text>
                </View>
            </View>
            <View style={styles.reviewsWrapper}>
                    <FlatList
                        nestedScrollEnabled
                        ListHeaderComponent={<Text style={styles.title}>What people are saying...</Text>}
                        data={reviews}
                        renderItem={({item})=><ReviewTile navigation={navigation} review={item} />}
                        keyExtractor={item=>item.id}
                        ListEmptyComponent={<Text style={{textAlign:"center", paddingVertical:20, fontFamily:"Open-Sans-Bold"}}>No reviews</Text>}
                    />
                <Text onPress={()=>navigation.navigate("Reviews")} style={styles.seeReviews}>See all reviews</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        // height:"100%",
        backgroundColor:"#fff",
        paddingBottom: 50
    },
    sectionWrapper: {
        padding:10,
        borderBottomColor:"#eee",
        borderBottomWidth:1,
        backgroundColor:"#fff"
    },

    title: {
        color:"#7536ad",
        paddingBottom:20,
        fontSize:12,
        fontFamily: 'Open-Sans-Bold'
    },

    openingHoursWrapper: {
        flexDirection:"row",
        justifyContent:"space-between"
    },

    statusWrapper: {
        flexDirection:"row",
        alignItems:"center"
    },

    dot: {
        width:8,
        height:8,
        borderRadius:4,
        backgroundColor:"red",
        marginRight:5
    },

    status: {
        color:"red",
        fontFamily: 'Open-Sans-Bold'
    },

    toggleWrapper: {
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:5
    },

    toggleText: {
        color:"#7536ad",
        marginRight:5,
        fontSize:12,
        fontFamily: 'Open-Sans'
    },

    categoryWrapper: {
        paddingVertical:10,
        flexDirection:"row"
    },

    category: {
        color:"#f2bc3f",
        fontSize:12,
        marginTop:5,
        fontFamily: 'Open-Sans-Bold'
    },

    categoryInfo: {
        marginHorizontal:8,
        justifyContent:"space-between",
        width:"90%"
    },
    
    locationWrapper: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },

    btn: {
        borderWidth:2,
        borderColor:"#7536ad",
        borderRadius:25,
        paddingHorizontal:20,
        paddingVertical:10
    },

    btnText: {
        color:"#7536ad",
        fontFamily: 'Open-Sans'
    },

    mapWrapper: {
        paddingVertical: 15,
        backgroundColor:"#fff"
    },

    mapStyle: {
        height:100
    },

    contactWrapper: {
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:10,
        alignItems:"center"
    },

    contactTextRight: {
        color:"#7536ad",
        paddingRight:10,
        fontFamily: 'Open-Sans-Bold'
    },

    contactTextLeft: {
        fontFamily: 'Open-Sans-Bold',
        width:"80%"
    },

    reviewsWrapper: {
        padding:10,
        backgroundColor:"#fff",
        marginTop:20
    },

    seeReviews: {
        color:"#7536ad",
        textAlign:"center",
        paddingVertical:15,
        fontFamily: 'Open-Sans-Bold'
    },

    openingTimesWrapper: {
        paddingTop:20
    },

    timeWrapper: {
        paddingVertical:5,
        flexDirection:"row"
    },

    day: {
        fontFamily: 'Open-Sans-Bold',
        color:"#f2bc3f",
        paddingHorizontal:10,
        width:"15%",
        textTransform:"capitalize"
    },

    time: {
        fontFamily:"Open-Sans-Bold",
        paddingHorizontal:10
    }
})
