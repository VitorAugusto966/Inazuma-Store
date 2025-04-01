import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoriteItems: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const product = action.payload;
            const index = state.favoriteItems.findIndex(item => item.id === product.id);

            if (index !== -1) {
                state.favoriteItems.splice(index, 1);
            } else {
                state.favoriteItems.push(product);
            }
        },
        clearFavorites: (state) => {
            state.favoriteItems = []; 
        },
    },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
