import React from 'react'
import { Text, StyleSheet, View, Platform, Modal, ActivityIndicator, Alert } from 'react-native'
import InputFields from '../components/InputFields'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import CategoryIcon from '../components/CategoryIcon'
import SubmitButton from '../components/SubmitButton'
import CancelButton from '../components/CancelButton'
import { LinearGradient } from 'expo-linear-gradient'
import BackButton from '../components/BackButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { countries, cities, API } from '../utils/confiq'
import SelectInput from '../components/SelectInput'
import NextButton from '../components/NextButton'
import { Toast } from 'native-base'
import { addToMyBusiness } from '../redux/businessStore'
import { useSelector, useDispatch } from 'react-redux'

export default function AddBusiness({
    navigation,
    route
}){
    const { authToken, categories } = useSelector(state=>state.app)
    const [formDetails, setFormDetails] = React.useState({
        category:"",
        country:"",
        state:"",
        name:"",
        address:"",
        building:"",
        zip_code:""
    })
    const dispatch = useDispatch()
    const [page, setPage] = React.useState("one")
    const [disabled, setDisabled] = React.useState(true)
    const [submitDisabled, setSubmitDisabled] = React.useState(true)
    const [isLoading, setIsLoading] = React.useState(false)
    const [response, setResponse] = React.useState(null)

    React.useEffect(()=>{
        const { category, country, name, zip_code, building, address, state } = formDetails
        if(category!==""&&country!==""&&name!==""){
            if(disabled==true){
                setDisabled(false)
            }
        } else {
            if(disabled==false){
                setDisabled(true)
            }
        }
        if(zip_code!==""&&building!==""&&address!==""&&state!==""){
            if(submitDisabled==true){
                setSubmitDisabled(false)
            } 
        } else {
            if(submitDisabled==false){
                setSubmitDisabled(true)
            }
        }
    },[disabled, submitDisabled, formDetails])

    const clear = (name)=> {
        setFormDetails({
            ...formDetails,
            [name]:""
        })
    }

    const onInputText = (name, val)=> {
        setFormDetails({
            ...formDetails,
            [name]:val
        })
    }

    const onSelect = (name, val)=> {
        setFormDetails({
            ...formDetails,
            [name]:val?.value
        })
    }

    const gotoPageOne = () => {
        setPage("one")
    }

    const gotoPageTwo = () => {
        setPage("two")
    }

    const validate = ()=> {
        const { 
            state, 
            address, 
            building, 
            zip_code } = formDetails
        if(state===""){
            errorMessage("Please select a state.")
            return false
        }
        if(address===""){
            errorMessage("Kindly enter address")
            return false
        }
        if(building===""){
            errorMessage("Kindly enter building")
            return false
        }
        if(zip_code===""){
            errorMessage("Kindly enter zip code")
            return false
        }
        return true
    }

    const errorMessage = (message)=> {
        Toast.show({
            text:{message},
            duration: 8000,
            position: "top",
            type: "danger"
        })
    }

    const onSubmit = async ()=> {
        try {
            setIsLoading(true)
            if(!validate()){
                setIsLoading(false)
                return
            }
            API.setHeader('Authorization', "Bearer "+authToken)
            const response = await API.post('/business', formDetails)
            if(response.ok){
                setResponse(true)
                dispatch(addToMyBusiness(response.data?.business))
                setTimeout(() => {
                    setIsLoading(false)
                    navigation.navigate("Tabs", {screen:"Profile"})
                }, 5000)
            } else {
                setResponse(false)
                setTimeout(() => {
                    setIsLoading(false)
                }, 5000)
            }
        } catch (error) {
            setIsLoading(false)
            errorMessage(error.message)
        }
    }

    const { 
        category, 
        country, 
        state, 
        name, 
        address, 
        building, 
        zip_code } = formDetails

    const categoriesItem = categories.map(category=>{
        return {
            label:category?.name,
            value:category?.name,
            icon:()=><CategoryIcon type={category?.key} />
        }
    })

    const selectedCategory = categories.filter(cate=>{
        return cate?.name === category
    })

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#f7702d','transparent']}
                style={styles.gradientView}
                start={{
                    x:0.5,
                    y:0
                }}
            >
                <View 
                    style={[
                        styles.Navbar, page==="two" 
                        && {justifyContent:"space-between"}, 
                        Platform.OS==="android" ? 
                        {marginTop:"10%"}:
                        {marginTop:"12%"}
                    ]}
                >
                    {
                        page==="two" &&
                        <BackButton color={"white"} onPress={gotoPageOne} />
                    }
                    <CancelButton onPress={()=>navigation.navigate('Tabs', {screen:"Profile"})} />
                </View>
                {
                    page==="one" &&
                    <KeyboardAwareScrollView bounces={false} contentContainerStyle={styles.firstCollection}>
                        <Text style={styles.title}>Select your business category & give your profile a name.</Text>
                        <View style={styles.underline}></View>
                        <View style={{ zIndex:2, position: "relative"}}>
                            <Text style={styles.label}>Category</Text>
                            <SelectInput 
                                data={categoriesItem}
                                placeholder="Your business category"
                                defaultValue={category}
                                onChangeItem={(item)=>onSelect("category", item)}
                            />
                        </View>
                        <Text style={styles.label}>Business Name</Text>
                        <InputFields
                            containerStyle={styles.input} 
                            placeholder="Your business name" 
                            input={name}
                            defaultValue={name}
                            clear={()=>clear("name")}
                            onChangeText={(text)=>onInputText("name", text)}
                        />
                        <View style={{ zIndex:1, position: "relative"}}>

                            <Text style={styles.label}>Country</Text>
                            <SelectInput 
                                data={countries}
                                placeholder="Select your country" 
                                defaultValue={country}
                                onChangeItem={(item)=>onSelect("country", item)}
                            />
                        </View>
                        <NextButton 
                            disabled={disabled} 
                            onPress={gotoPageTwo} 
                        />
                    </KeyboardAwareScrollView>
                }
                {
                    page==="two" &&
                    <View style={styles.secondCollection}>
                        <View style={styles.businessCard}>
                            <View style={[styles.categoryWrapper,{backgroundColor:"#"+selectedCategory[0].color}]}>
                                <CategoryIcon type={selectedCategory[0].key} />
                            </View>
                            <View style={styles.businessInfo}>
                                <Text style={styles.boldText}>Your business name</Text>
                                <Text style={styles.businessName}>{name}</Text>
                            </View>
                        </View>
                        <Text style={styles.title}>Enter the address to complete.</Text>
                        <View style={styles.underline}></View>
                        <View style={styles.inputRow}>
                            <View style={styles.leftWrapper}>
                                <Text style={styles.label}>Street Name / Address</Text>
                                <InputFields 
                                    containerStyle={styles.input} 
                                    placeholder="Patrice Lumba Rd." 
                                    input={address}
                                    defaultValue={address}
                                    clear={()=>clear("address")}
                                    onChangeText={(text)=>onInputText("address", text)}
                                />
                            </View>
                            <View style={styles.rightWrapper}>
                                <Text style={styles.label}>House No.</Text>
                                <InputFields 
                                    containerStyle={styles.input} 
                                    placeholder="22" 
                                    input={building}
                                    defaultValue={building}
                                    clear={()=>clear("building")}
                                    onChangeText={(text)=>onInputText("building", text)}
                                />
                            </View>
                        </View>
                        <View style={styles.inputRow}>
                            <View style={styles.leftWrapper}>
                                <Text style={styles.label}>City</Text>
                                <SelectInput 
                                    data={cities}
                                    defaultValue={state}
                                    placeholder="Select your city"
                                    onChangeItem={(item)=>onSelect("state", item)}
                                />
                            </View>
                            <View style={styles.rightWrapper}>
                                <Text style={styles.label}>Postcode</Text>
                                <InputFields    
                                    containerStyle={styles.input}
                                    placeholder="233"
                                    input={zip_code}
                                    defaultValue={zip_code}
                                    clear={()=>clear("zip_code")}
                                    onChangeText={(text)=>onInputText("zip_code", text)}
                                />
                            </View>
                        </View>
                        <SubmitButton 
                            containerStyle={{zIndex:-1}}
                            onPress={onSubmit}
                            label="Create Now" 
                            disabled={submitDisabled}
                        />
                    </View>
                }
                <View style={styles.statusBar}>
                    <View style={page==="one"?styles.halfStatus:styles.fullStatus}></View>
                </View>
            </LinearGradient>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isLoading}
            >
                <View style={styles.feedbackWrapper}>
                    {
                        response==null &&
                        <>
                            <ActivityIndicator size="large" color="#7536ad" />
                            <Text style={styles.feedback}>Crafting your business</Text>
                        </>
                    }
                    {
                        response==false &&
                        <>
                            <MaterialIcons name="error" size={80} color="red" />
                            <Text style={styles.feedback}>Oops! an error occured. Try again.</Text>
                        </>
                    }
                    {
                        response==true &&
                        <>
                            <MaterialCommunityIcons name="check-decagram" size={80} color="#76a803" />
                            <Text style={styles.feedback}>Business created successfully!</Text>
                        </>
                    }
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#7536ad"
    },

    gradientView: {
        flex:1
    },

    firstCollection: {
        paddingTop:"5%",
        paddingHorizontal:20,
        flex:1,
        position:"relative"
    },

    title: {
        fontSize:25,
        width:"70%",
        color:"white",
        fontFamily: 'Open-Sans-Bold'
    },

    underline: {
        width:40,
        height:4,
        backgroundColor:"#ffa300",
        marginVertical:20
    },

    label: {
        color:"white",
        fontSize:15,
        paddingVertical:10,
        fontFamily: 'Open-Sans-Bold'
    },

    input: {
        height:50
    },

    nextBtn: {
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:30,
        backgroundColor:"#ffa300",
        alignSelf:"flex-end",
        paddingVertical:10,
        borderRadius:25,
        justifyContent:"center",
        marginVertical:20
    },

    disabled: {
        opacity:0.5
    },

    btnText: {
        color:"white",
        fontSize:16,
        marginLeft:5,
        textAlign:"center",
        fontFamily: 'Open-Sans-Bold'
    },

    smallText: {
        color:"white",
        fontSize:12,
        marginLeft:5,
        textAlign:"center",
        fontFamily: 'Open-Sans-Bold'
    },

    cancelBtn: {
        flexDirection:"row",
        alignItems:"center",
        alignSelf:"flex-end"
    },

    Navbar: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-end",
        paddingHorizontal:10,
        width:"100%"
    },

    backBtn: {
        flexDirection:"row",
        alignItems:"center"
    },

    statusBar: {
        backgroundColor:"#fff",
        height:4,
        position:"absolute",
        width:"100%",
        bottom:0
    },

    secondCollection: {
        paddingTop:"10%",
        paddingHorizontal:20
    },

    businessCard: {
        backgroundColor:"#fff",
        height:100,
        borderRadius:4,
        flexDirection:"row",
        alignItems:"center",
        marginBottom:30
    },

    categoryWrapper: {
        width:"35%",
        height:"100%",
        borderTopLeftRadius:4,
        borderBottomLeftRadius:4,
        justifyContent:"center",
        alignItems:"center"
    },

    businessInfo: {
        paddingHorizontal:10
    },

    businessName: {
        fontSize:20,
        color:"#7536ad",
        paddingVertical:10,
        fontFamily:"Open-Sans-Bold"
    },

    boldText: {
        fontFamily: 'Open-Sans-Bold'
    },

    inputRow: {
        flexDirection:"row",
        alignItems:"center"
    },

    leftWrapper: {
        width:"60%"
    },

    rightWrapper: {
        width:"37%",
        marginLeft:10
    },

    createBtn: {
        backgroundColor:"#ffa300",
        paddingVertical:10,
        borderRadius:25,
        marginVertical:20,
    },

    getLocBtn: {
        marginTop:10,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },

    fullStatus: {
        width:"100%",
        backgroundColor:"#ffa300",
        height:"100%"
    },

    halfStatus: {
        width:"50%",
        backgroundColor:"#ffa300",
        height:"100%"
    },

    feedbackWrapper: {
        flex:1,
        backgroundColor:"#fff",
        justifyContent:"center",
        alignItems:"center"
    },

    feedback: {
        color:"#484848",
        paddingVertical:20
    }
})
