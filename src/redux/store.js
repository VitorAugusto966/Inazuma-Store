import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import favoritoReducer from './favorito/favoritoSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist/es/constants";
import  userReducer  from './user/userSlice';

const persistConfig = {
  key: "root",
  storage,
};


const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedFavoritoReducer = persistReducer(persistConfig, favoritoReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const Store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    favorites: persistedFavoritoReducer,
    user: persistedUserReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], 
      },
    }),
});

export const persistor = persistStore(Store);
