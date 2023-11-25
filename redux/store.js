import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {PersistedReducer} from './reducers';
import {FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';

const Store = configureStore({
    reducer: PersistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

const PersistedStore = persistStore(
    Store,
    null,
    () => {
        console.log('Done with rehydration');
    }
);

export {
    Store,
    PersistedStore
};
