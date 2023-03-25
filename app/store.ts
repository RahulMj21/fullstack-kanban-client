import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/boardSlice";
import favouriteBoardReducer from "../features/favouriteBoardSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        boards: boardReducer,
        favouriteBoards: favouriteBoardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
