import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const startMedia = createAsyncThunk(
  "media/startMedia",
  async (args: { type: string; number: number; surah: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      //https://api.alquran.cloud/v1/surah/2/ar.alafasy?offset=18&limit=1https://api.alquran.cloud/v1/surah/2/ar.alafasy?offset=18&limit=1
      const { data }: any = await axios.get(
        "https://api.alquran.cloud/v1/surah/" +
          (args.surah + 1) +
          "/ar.alafasy?offset=" +
          Number(args.number - 1) +
          "&limit=1",
        {
          withCredentials: false,
        }
      );
      return {
        number: args.number,
        surahNumber: data.data.number,
        numberOfAyahs: data.data.numberOfAyahs,
        type: "ayah",
        mediaURL: data.data.ayahs[0].audio,
      };
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
);

interface InitalState {
  type: string | null;
  number: number;
  mediaURL?: string;
  loading: boolean;
  surahNumber?: number;
  error: string | undefined;
  numberOfAyahs: number;
  playing: boolean;
}
const initialState: InitalState = {
  type: null,
  number: 0,
  loading: false,
  error: undefined,
  numberOfAyahs: 0,
  playing: false,
};

export const MediaSlice = createSlice({
  name: "media",
  initialState: initialState,
  reducers: {
    stopMedia: (state) => {
      state.type = null;
      state.number = 0;
      state.loading = false;
      state.error = undefined;
      state.numberOfAyahs = 0;
      state.playing = false;
    },
    playingMedia: (state) => {
      state.playing = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startMedia.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(startMedia.fulfilled, (state, { payload }: any) => {
      state.loading = false;
      state.mediaURL = payload?.mediaURL;
      state.type = payload.type;
      state.error = undefined;
      state.number = payload.number;
      state.numberOfAyahs = payload.numberOfAyahs;
      state.surahNumber = payload.surahNumber;
      state.playing = true;
    });
    builder.addCase(startMedia.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { stopMedia, playingMedia } = MediaSlice.actions;
