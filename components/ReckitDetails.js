import React from 'react'
import { Text, StyleSheet, View, SafeAreaView, Modal, FlatList } from 'react-native'
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
    user
}){
    return (
        <Modal
            transparent={false}
            visible={open}
        >
            <SafeAreaView style={styles.wrapper}>
                <View style={{height:"100%", paddingBottom:100}}>
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
                            renderItem={({item})=><Comment comment={item}  />}
                            keyExtractor={item=>item.id}
                            contentContainerStyle={styles.commentArea}
                            ListEmptyComponent={<Text style={{textAlign:"center", color:"#999"}}>No replies to reckit yet.</Text>}
                        />
                    </View>
                    <View style={styles.replyBox}>
                        <Reply 
                            defaultValue={defaultComment}
                            showRepliesLink={false}
                            item={item}
                            isSubmitting={isSubmitting}
                            onSubmit={onSubmit}
                            onChangeText={onChangeText}
                            user={user}
                        />
                    </View>
                </View>
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
