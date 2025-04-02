import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import favoritoReducer from './favorito/favoritoSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist/es/constants";
import  userReducer  from './user/userSlice';

const cartPersistConfig = {
  key: "cart",
  storage,
};

const favoritoPersistConfig = {
  key: "favorites",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedFavoritoReducer = persistReducer(favoritoPersistConfig, favoritoReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);


export const Store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    favorites: persistedFavoritoReducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], 
      },
    }),
});

export const persistor = persistStore(Store);
