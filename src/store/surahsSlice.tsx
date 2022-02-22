import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UsersState {
  surahs: any[];
  loading: boolean;
  error: any;
}
const initialState: UsersState = {
  surahs: [],
  loading: false,
  error: "",
};

export const getSurahs = createAsyncThunk(
  "surahs/getSurahs",
  async (args, thunkAPI) => {
    try {
      const { data } = await axios.get("https://api.alquran.cloud/v1/meta", {
        withCredentials: false,
      });
      return data.data.surahs.references;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// args values to dispatch

const surahsSlice = createSlice({
  name: "surahs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSurahs.fulfilled, (state, action) => {
      state.surahs = action.payload;
      state.loading = false;
    });
    builder.addCase(getSurahs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSurahs.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

//when using TypeScript, you should use the builder style notation for extraReducers and all your Types will be automatically inferred for you. You should not need to type anything down in extraReducers by hand - ever.

export default surahsSlice;
