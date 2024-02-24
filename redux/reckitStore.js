import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    reckits:[],
    myReckits:[]
};

const ReckitStore = createSlice({
    name: 'reckits',
    initialState: initialState,
    reducers: {
        setReckits(state, action) {
            state.reckits = action.payload;
        },
        setMyReckits(state, action) {
            state.myReckits = action.payload;
        },
        addReckits(state, action) {
            if(state.reckits.length<1){
                state.reckits = [action.payload]
            } else {
                state.reckits = [ action.payload, ...state.reckits ]
            }
        },
        addMyReckits(state, action) {
            if(state.myReckits.length<1){
                state.myReckits = [action.payload]
            } else {
                state.myReckits = [ action.payload, ...state.myReckits ]
            }
        },
        updateMyReckits(state, action) {
            const filteredList = state.myReckits.filter(reckit=>{
                reckit.id !== action.payload.id
            })
            state.myReckits = [action.payload, ...filteredList]
        },
        removeMyReckitReply(state, action) {
            const filteredList = state.myReckits.filter(reckit=>{
                if(reckit.id === action.payload.reckitId){
                    const filteredReplies = reckit.comments.filter(reply=>{
                        reply.id !== action.payload.replyId
                    })
                    return {...reckit, comments:filteredReplies}
                }
                return reckit
            })
            console.log(filteredList)
            state.myReckits = filteredList
        },
        removeReckitReply(state, action) {
            const filteredList = state.reckits.filter(reckit=>{
                if(reckit.id === action.payload.reckitId){
                    const filteredReplies = reckit.comments.filter(reply=>{
                        reply.id !== action.payload.replyId
                    })
                    return {...reckit, comments:filteredReplies}
                }
                return reckit
            })
            state.reckits = filteredList
        }
    }
});

export const {
    setReckits,
    addReckits,
    setMyReckits,
    addMyReckits,
    updateMyReckits,
    removeMyReckitReply,
    removeReckitReply
} = ReckitStore.actions;

export const reckitReducer = ReckitStore.reducer;

export default ReckitStore;
