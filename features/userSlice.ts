import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "../utils/types";
import { RootState } from "../app/store";

const initialState: IUserState = {
    user: null,
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserState>) => {
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export const getUser = (state: RootState) => state.user.user;
export const getIsAuthenticated = (state: RootState) =>
    state.user.isAuthenticated;

export default userSlice.reducer;
