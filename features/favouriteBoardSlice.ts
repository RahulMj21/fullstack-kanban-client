import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IBoard } from "../utils/interfaces";

const initialState: { allBoards: IBoard[]; boardsCount: number } = {
    allBoards: [],
    boardsCount: 0,
};

export const favouriteBoardSlice = createSlice({
    name: "favouriteBoards",
    initialState,
    reducers: {
        setFavouriteBoards: (state, action: PayloadAction<IBoard[]>) => {
            state.allBoards = action.payload;
            state.boardsCount = action.payload.length;
        },
        clearFavouriteBoards: (state) => {
            state.allBoards = [];
            state.boardsCount = 0;
        },
    },
});

export const { clearFavouriteBoards, setFavouriteBoards } =
    favouriteBoardSlice.actions;

export const getFavouriteBoards = (state: RootState) => state.favouriteBoards;

export default favouriteBoardSlice.reducer;
