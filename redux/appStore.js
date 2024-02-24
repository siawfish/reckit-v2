import {createSlice} from '@reduxjs/toolkit';
import { categories } from '../utils/confiq';

const initialState = {
    isAuthenticated: false,
    authToken: undefined,
    profile: undefined,
    location: undefined,
    showOnboarding: true,
    categories: categories,
    locationPermission: false,
    pushToken: undefined
}

const AppStore = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setIsAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
        setAuthToken(state, action) {
            state.authToken = action.payload;
        },
        setUserProfile(state, action) {
            state.profile = action.payload;
        },
        setLocation(state, action) {
            state.location = action.payload;
        },
        setShowOnboarding(state, action) {
            state.showOnboarding = action.payload;
        },
        setLocationPermission(state, action) {
            state.locationPermission = action.payload;
        },
        resetAppStore(state) {
            return {
                ...initialState, 
                location: state.location
            }
        }
    }
});

export const {
    setAuthToken,
    resetAppStore,
    setUserProfile,
    setIsAuthenticated,
    setLocation,
    setShowOnboarding,
    setLocationPermission
} = AppStore.actions;

export const appReducer = AppStore.reducer;

export default AppStore;
