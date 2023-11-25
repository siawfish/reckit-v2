import React from 'react'
import { Text, StyleSheet, View, FlatList, Platform } from 'react-native'
import InputFields from '../components/InputFields'
import ListItem from '../components/ListItem'
import SearchCaption from '../components/SearchCaption'
import CategoryRow from '../components/CategoryRow'
import { LinearGradient } from 'expo-linear-gradient'
import BackButton from '../components/BackButton'
import { Toast } from 'native-base'
import { API, baseURL } from '../utils/confiq'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'

export default function SearchScreen({
    route,
    navigation
}) {
    const { categories } = useSelector(state=>state.app)
    const [query, setQuery] = React.useState("")
    const [inputLocation, setInputLocation] = React.useState("")
    const [results, setResults] = React.useState([])
    const [searchNow, setSearchNow] = React.useState(false)
    const [isSearching, setIsSearching] = React.useState(false)

    React.useEffect(()=>{
        if(route?.params?.category){
            setQuery(route.params.category)
            setSearchNow(true)
        }
    },[])

    React.useEffect(()=>{
        if(searchNow){
            search()
        }
    },[searchNow])

    const queryInput = (text, boolean=false) =>{
        setQuery(text)
        setSearchNow(boolean)
    }

    const locationInput = (text, boolean=false) =>{
        setInputLocation(text)
        setSearchNow(boolean)
    }

    const clear = (name) => {
        switch (name) {
            case "location":
                setInputLocation("")
                break;
            case "query":
                setQuery("")
                break;
            default:
            break;
        }
        setResults([])
        setSearchNow(false)
    }

    const search = ()=> {
        setIsSearching(true)
        setSearchNow(false)
        if(query==="" && inputLocation===""){
            return
        }
        if(inputLocation!==""){
            getLocationCoords()
            return
        }
        getResults()
    }

    const getLocationCoords = async ()=> {
        try {
            API.setBaseURL("https://maps.googleapis.com/maps/api")
            const { ok, data, problem } = await API.get("/geocode/json", {
                address:`${inputLocation}, Ghana`,
                key:"AIzaSyDT-SgKQIcC9mLg6bGlNEzoII7i2s9KvSo",
                components:{
                    country:"GH"
                }
            })
            if(ok){
                if(data.status==="OK"){
                    getResults(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng)
                } else if(data.status=="ZERO_RESULTS"){
                    Toast.show({
                        text:"Invalid location",
                        duration: 5000,
                        position: "top",
                        type: "danger"
                    })
                }
            } else {
                Toast.show({
                    text:problem,
                    duration: 5000,
                    position: "top",
                    type: "danger"
                })
            }
        } catch (error) {
            Toast.show({
                text:error.message,
                duration: 5000,
                position: "top",
                type: "danger"
            })
        }
    }

    const getResults = async (lat, lon) =>{
        try {
            API.setBaseURL(baseURL)
            const { ok, data, problem } = await API.get('/search',{
                query:query,
                latitude:lat,
                longitude:lon
            })
            if(ok){
                if(data.length<1){
                    Toast.show({
                        text:`Zero results found for your search`,
                        duration: 5000,
                        position: "top",
                        type: "warning"
                    })
                }
                setResults(data)
            } else {
                Toast.show({
                    text:data.error || problem,
                    duration: 5000,
                    position: "top",
                    type: "danger"
                })
            }
            setIsSearching(false)
        } catch (error) {
            Toast.show({
                text:error.message,
                duration: 5000,
                position: "top",
                type: "danger"
            })
            setIsSearching(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
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
                    <BackButton color="#ffffff" onPress={()=>navigation.goBack()} />
                    <InputFields 
                        search
                        placeholder="Search by name or category"
                        onChangeText={(text)=>queryInput(text)}
                        clear={()=>clear("query")}
                        onBlur={search}
                        defaultValue={query}
                        containerStyle={{marginTop:10}}
                    />
                    <InputFields 
                        locationSearch 
                        defaultValue={inputLocation}
                        placeholder="Look for specific location" 
                        onChangeText={(text)=>locationInput(text)}
                        clear={()=>clear("location")}
                        textContentType='addressCity'
                        onBlur={search}
                        containerStyle={{marginTop:10}}
                    />
                </LinearGradient>
            </View>
            <View style={styles.contentWrapper}>
                {
                    results.length<1 ? 
                    <FlatList 
                        bounces={false}
                        data={categories}
                        renderItem={({item})=><CategoryRow onPress={()=>queryInput(item.name, true)} type={item.key} item={item} />}
                        keyExtractor={item=>item.key}
                        ListHeaderComponent={<Text style={[styles.title, {backgroundColor:"#fff"}]}>Suggested categories</Text>}
                        showsVerticalScrollIndicator={false}
                        stickyHeaderIndices={[0]}
                    /> :
                    <FlatList
                        bounces={false}
                        data={results}
                        ListHeaderComponent={<SearchCaption location={inputLocation} business={query} />}
                        renderItem={({item})=><ListItem style={{marginHorizontal:15}} navigation={navigation} business={item} />}
                        keyExtractor={business=>business.id}
                        showsVerticalScrollIndicator={false}
                        stickyHeaderIndices={[0]}
                    />
                }
            </View>
            {
                isSearching && 
                <Loader />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff"
    },

    searchContainer: {
        position:"relative",
        height:Platform.OS==="android" ? "27%" : "24%",
        backgroundColor:"#7536ad"
    },

    title: {
        color:"#7536ad",
        paddingVertical:20,
        fontSize:12,
        paddingHorizontal:15,
        fontFamily: 'Open-Sans-Bold'
    },

    contentWrapper: {
        flex:1,
    },

    gradientView: {
        paddingTop:40,
        paddingBottom:20,
        paddingHorizontal:30,
        flex:1,
        // borderBottomLeftRadius:200
    }
    
})
