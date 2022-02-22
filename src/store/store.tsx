import { configureStore } from "@reduxjs/toolkit";
import authSLice from "./authSlice";
import favSlice from "./favSlice";
import { MediaSlice } from "./mediaSlice";
import surahsSlice from "./surahsSlice";

export const store = configureStore({
  reducer: {
    surahs: surahsSlice.reducer,
    media: MediaSlice.reducer,
    auth: authSLice.reducer,
    fav: favSlice.reducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
