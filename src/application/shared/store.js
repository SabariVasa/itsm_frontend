import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';

import { reduxReducers } from '../modules';

const persistConfig = {
    key: 'root',
    storage,
};

const reducers = combineReducers({
    ...reduxReducers,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    // serializableCheck: false,
    // }),
});

export const persistor = persistStore(store);
