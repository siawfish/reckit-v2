import React from 'react'
import { Text, StyleSheet, View, SafeAreaView, Modal, FlatList, ActivityIndicator } from 'react-native'
import BackButton from './BackButton'
import Comment from './Comment'
import Question from './Question'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Reply from './Reply'

export default function ReckitDetails({
    open=false,
    item,
    commentsCount,
    onClose,
    comments=[],
    isSubmitting,
    onSubmit,
    onChangeText,
    defaultComment,
    user,
    onDeleteComplete,
}){
    return (
        <Modal
            transparent={false}
            visible={open}
        >
            <SafeAreaView style={styles.wrapper}>
                <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:100, height: "100%"}}>
                    {
                        isSubmitting &&
                        <View 
                            style={{
                                alignItems:"center", 
                                justifyContent:"center", 
                                position: "absolute", 
                                top: 40, 
                                bottom: 0, 
                                width: "100%",
                                zIndex: 100,
                                backgroundColor:"#fff",
                                opacity:0.5
                            }}
                        >
                            <ActivityIndicator size="small" color="#7536ad" />
                        </View>
                    }

                    <View style={styles.container}>
                        <FlatList 
                            ListHeaderComponent={
                                <>
                                    <View style={styles.nav}>
                                        <BackButton onPress={onClose} color="#7536ad" />
                                    </View>
                                    <Question 
                                        item={item}
                                        commentsCount={commentsCount}
                                    />
                                </>
                            }
                            data={comments}
                            renderItem={({item})=><Comment onClose={onClose} onDeleteComplete={onDeleteComplete} comment={item}  />}
                            keyExtractor={(key)=>key.id}
                            contentContainerStyle={styles.commentArea}
                            ListEmptyComponent={<Text style={{textAlign:"center", color:"#999"}}>No replies to reckit yet.</Text>}
                        />
                    </View>
                    <View style={styles.replyBox}>
                        <Reply 
                            defaultValue={defaultComment}
                            showRepliesLink={false}
                            isSubmitting={isSubmitting}
                            onSubmit={onSubmit}
                            onChangeText={onChangeText}
                            user={user}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
        backgroundColor:"#fff",
    },

    nav: {
        marginBottom:20
    },

    container: {
        paddingTop:20,
        paddingHorizontal:20,
        flex:1
    },

    commentWrapper: {
        padding:10,
        flexDirection:"row",
        alignItems:"center"
    },

    replyBox: {
        position:"absolute",
        bottom:0,
        left:0,
        right:0,
        backgroundColor:"#fff"
    }
})
