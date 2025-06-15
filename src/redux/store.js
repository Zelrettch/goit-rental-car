import { configureStore } from "@reduxjs/toolkit";
import catalogRedicer from "./catalog/slice";
import favouritesReducer from "./favourites/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "favourites-persist",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, favouritesReducer);

export const store = configureStore({
  reducer: {
    catalog: catalogRedicer,
    favourites: persistedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
