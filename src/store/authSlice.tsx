import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: any = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || " {}")
    : {},
  loading: false,
  error: "",
};

export const signin = createAsyncThunk(
  "auth/login",
  async (args: { email: string; password: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log({ email: args.email, password: args.password });
    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/signin",
        {
          email: args.email,
          password: args.password,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      return res.data.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signout = createAsyncThunk(
  "auth/signout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(logout());
      const data = await axios.get("http://localhost:8000/api/user/signout");
      localStorage.removeItem("user");

      return {};
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    args: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      gander: string;
    },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    console.log({ email: args.email, password: args.password });
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/signup",
        {
          email: args.email,
          name: args.firstName,
          password: args.password,
          gander: args.gander,
          lastName: args.lastName,
        },
        {
          withCredentials: true,
        }
      );
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMe = createAsyncThunk("auth/getme", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.get("http://localhost:8000/api/user/me", {
      withCredentials: true,
    });
    return data.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const authSLice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(signin.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(signin.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(signup.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(signup.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { logout } = authSLice.actions;
export default authSLice;