import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: any = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : {},
  loading: false,
  error: "",
};

export const signin = createAsyncThunk(
  "auth/login",
  async (args: { email: string; password: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        "https://qn-api.onrender.com/api/user/signin",
        {
          email: args.email,
          password: args.password,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("token", JSON.stringify(res.data.data.token));
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
      const data = await axios.get(
        "https://qn-api.onrender.com/api/user/signout",
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("token") &&
              JSON.parse(localStorage.getItem("token") || "")
            }`,
          },
        }
      );
      console.log("Asd");
      localStorage.setItem("token", JSON.stringify(""));
      localStorage.setItem("user", JSON.stringify({}));
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
    try {
      const { data } = await axios.post(
        "https://qn-api.onrender.com/api/user/signup",
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
      localStorage.setItem("user", JSON.stringify(data.data.user));

      localStorage.setItem("token", JSON.stringify(data.data.token));
      return data.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMe = createAsyncThunk("auth/getme", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.get(
      "https://qn-api.onrender.com/api/user/me",
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
