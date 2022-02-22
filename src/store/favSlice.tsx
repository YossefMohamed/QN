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
        "http://localhost:8000/api/favorite",
        {
          text: args.text,
          number: args.number,
          englishText: args.englishText,
          type: args.type,
          surah: args.surah || 0,
          user: args.user,
        },
        {
          withCredentials: true,
        }
      );
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFavs = createAsyncThunk("fav/getall", async (_, thunkApi) => {
  try {
    const res = await axios.get("http://localhost:8000/api/favorite/", {
      withCredentials: true,
    });
    console.log(res.data.data);
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
      console.log(action);
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
  },
});

export default favSlice;
