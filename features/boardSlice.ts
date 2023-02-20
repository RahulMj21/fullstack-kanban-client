import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IBoard } from "../utils/types";

const initialState: IBoard[] = [];

export const boardSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {
        setBoards: (state, action: PayloadAction<IBoard[]>) => {
            state = action.payload;
        },
        clearBoards: (state) => {
            state = [];
        },
    },
});

export const { setBoards, clearBoards } = boardSlice.actions;

export const getBoards = (state: RootState) => state.boards;

export default boardSlice.reducer;
