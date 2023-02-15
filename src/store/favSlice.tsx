import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: any = {
  fav: [{}],
  loading: false,
  error: "",
};

axios.defaults.withCredentials = true;

export const addFav = createAsyncThunk(
  "fav/postfav",
  async (args: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        "https://qn-api.onrender.com/api/favorite",
        {
          text: args.text,
          number: args.number,
          englishText: args.englishText,
          type: args.type,
          surah: args.surah || 0,
          user: args.user,
          surahName: args.surahName,
        },
        {
          withCredentials: true,

          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("token") &&
              JSON.parse(localStorage.getItem("token") || "")
            }`,
          },
        }
      );
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeFav = createAsyncThunk(
  "fav/remove",
  async (args: { id: string }, thunkApi) => {
    const res = await axios.delete(
      "https://qn-api.onrender.com/api/favorite/" + args.id,
      {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("token") &&
            JSON.parse(localStorage.getItem("token") || "")
          }`,
        },
      }
    );
    return res.data.data;
  }
);

export const getFavs = createAsyncThunk("fav/getall", async (_, thunkApi) => {
  try {
    const res = await axios.get("https://qn-api.onrender.com/api/favorite/", {
      withCredentials: true,

      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token") &&
          JSON.parse(localStorage.getItem("token") || "")
        }`,
      },
    });
    return res.data.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addFav.fulfilled, (state, action) => {
      state.fav = action.payload;
      state.loading = false;
    });
    builder.addCase(addFav.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addFav.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getFavs.fulfilled, (state, action) => {
      state.loading = false;
      state.fav = action.payload;
    });
    builder.addCase(getFavs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getFavs.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(removeFav.fulfilled, (state, action: any) => {
      state.fav = state.fav.filter(
        (fav: { _id: string }) => fav._id !== action.meta.arg.id
      );

      state.loading = false;
    });
    builder.addCase(removeFav.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removeFav.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default favSlice;
