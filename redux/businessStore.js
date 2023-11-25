import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    businesses:[],
    myBusinesses:[]
};

const BusinessStore = createSlice({
    name: 'business',
    initialState: initialState,
    reducers: {
        setBusinesses(state, action) {
            state.businesses = [...action.payload];
        },
        setMyBusiness(state, action){
            state.myBusinesses = action.payload
        },
        addToMyBusiness(state, action) {
            state.myBusinesses = [...state.myBusinesses, action.payload]
        },
        updateMyBusiness(state, action) {
            const filteredList = state.myBusinesses.filter(business=>{
                return business.id !== action.payload.id
            })
            state.myBusinesses = [...filteredList, action.payload]
        },
        resetBusinesses(state, action){
            return initialState
        }
    }
});

export const {
    setBusinesses,
    resetBusinesses,
    setMyBusiness,
    addToMyBusiness,
    updateMyBusiness
} = BusinessStore.actions;

export const businessReducer = BusinessStore.reducer;

export default BusinessStore;
