import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: any = {
  loading: false,
  names: [],
  error: "",
};
export const getDeaths = createAsyncThunk("death/getDeaths", async () => {
  try {
    const { data }: any = await axios.get(
      "https://qn-api.onrender.com/api/death"
    );
    return data.data;
  } catch (error) {
    return "Error";
  }
});
export const postDeaths = createAsyncThunk(
  "death/postDeaths",
  async (args: { name: string; date: any }, thunkAPI) => {
    try {
      const { data }: any = await axios.post(
        "https://qn-api.onrender.com/api/death",
        {
          name: args.name,
          date: args.date,
        }
      );
      return thunkAPI.dispatch(getDeaths());
    } catch (error) {
      return "Error";
    }
  }
);
export const deathSlice = createSlice({
  name: "death",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDeaths.pending, (state, action: any) => {
      state.loading = true;
    });
    builder.addCase(getDeaths.fulfilled, (state, action: any) => {
      state.loading = false;
      state.names = action.payload;
    });
    builder.addCase(getDeaths.rejected, (state, action: any) => {
      state.loading = false;
    });
  },
});
