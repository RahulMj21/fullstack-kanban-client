import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IBoard } from "../utils/types";

const initialState: { allBoards: IBoard[]; boardsCount: number } = {
    allBoards: [],
    boardsCount: 0,
};

export const boardSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {
        setBoards: (state, action: PayloadAction<IBoard[]>) => {
            state.allBoards = action.payload;
            state.boardsCount = action.payload.length;
        },
        clearBoards: (state) => {
            state.allBoards = [];
            state.boardsCount = 0;
        },
    },
});

export const { setBoards, clearBoards } = boardSlice.actions;

export const getBoards = (state: RootState) => state.boards;

export default boardSlice.reducer;
