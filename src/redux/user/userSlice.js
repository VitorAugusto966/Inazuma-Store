import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, 
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        updateUser: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        updateAddress: (state, action) => {
            if (state.user) {
                state.user.address = { ...state.user.address, ...action.payload };
            }
        },
    },
});

export const { setUser, logout, updateUser, updateAddress } = userSlice.actions;
export default userSlice.reducer;
