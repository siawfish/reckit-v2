import {combineReducers} from '@reduxjs/toolkit';
import {appReducer} from './appStore';
import {businessReducer} from './businessStore'
import {reckitReducer} from './reckitStore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const rootReducer = combineReducers({
    app: appReducer,
    business: businessReducer,
    reckit: reckitReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: []
}

const PersistedReducer = persistReducer(
    persistConfig,
    rootReducer
);

export {
    rootReducer,
    PersistedReducer
}
