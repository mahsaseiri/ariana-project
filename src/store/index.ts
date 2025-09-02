import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";

// Configure Persist for auth separately
const authPersistConfig: PersistConfig<any> = {
  key: "auth",
  storage,
};

const recentSearchesPersistConfig: PersistConfig<any> = {
  key: "userRecentSearches",
  storage,
};

// Configure Persist for other reducers
const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  // Add prefix to ensure isolation
  blacklist: ["auth"], // Exclude auth and recentSearches from this persist config
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore specific redux-persist actions
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
