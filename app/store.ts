import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/boardSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        boards: boardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
