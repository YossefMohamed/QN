import { configureStore } from "@reduxjs/toolkit";
import authSLice from "./authSlice";
import { commentSlice } from "./commentSlice";
import { deathSlice } from "./deathSlice";
import favSlice from "./favSlice";
import { MediaSlice } from "./mediaSlice";
import { postSlice } from "./postSlice";
import surahsSlice from "./surahsSlice";

export const store = configureStore({
  reducer: {
    surahs: surahsSlice.reducer,
    media: MediaSlice.reducer,
    auth: authSLice.reducer,
    post: postSlice.reducer,
    fav: favSlice.reducer,
    comments: commentSlice.reducer,
    death: deathSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
