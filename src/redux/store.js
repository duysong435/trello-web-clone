
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import trelloSlice from './trelloSlice'
import authSlice from './authSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['trello']
}

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  // blacklist: ['trello'], // Không lưu trạng thái của trelloSlice
};
const trelloPersistConfig = {
  key: 'trello',
  storage: storage,
  // blacklist: ['boards'] // Không lưu trạng thái của trelloSlice
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  trello: persistReducer(trelloPersistConfig, trelloSlice.reducer)
})
// const rootReducer = combineReducers({
//   auth: authSlice.reducer,
//   trello: trelloSlice.reducer
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)
const persistedReducer = rootReducer;

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

const persistor = persistStore(store)

export { store, persistor }
