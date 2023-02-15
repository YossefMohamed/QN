import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addComment = createAsyncThunk(
  "comemnt/addComment",
  async (args: any, thunkAPI: any) => {
    try {
      const { data }: any = await axios.post(
        "https://qn-api.onrender.com/api/post/" + args.post + "/comment",
        {
          content: args.content,
        },
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("token") &&
              JSON.parse(localStorage.getItem("token") || "")
            }`,
          },
        }
      );
      thunkAPI.dispatch(getComments({ post: args.post }));
    } catch {}
  }
);

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (args: any, thunkAPI) => {
    try {
      const { data }: any = await axios.get(
        "https://qn-api.onrender.com/api/post/" + args.post + "/comment",
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("token") &&
              JSON.parse(localStorage.getItem("token") || "")
            }`,
          },
        }
      );
      return data.data;
    } catch (error) {}
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (args: any, thunkAPI) => {
    try {
      const { data }: any = await axios.delete(
        "https://qn-api.onrender.com/api/post/" +
          args.post +
          "/comment/" +
          args.comment,
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("token") &&
              JSON.parse(localStorage.getItem("token") || "")
            }`,
          },
        }
      );
      thunkAPI.dispatch(getComments({ post: args.post }));

      return data.data;
    } catch (error) {}
  }
);

const initialState: any = {
  loading: false,
  comments: [],
  error: "",
};
export const commentSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetComments: (state, action) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state, action: any) => {
      state.loading = true;
    });
    builder.addCase(getComments.fulfilled, (state, action: any) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(getComments.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addComment.pending, (state, action: any) => {
      state.loading = true;
    });
    builder.addCase(deleteComment.pending, (state, action: any) => {
      state.loading = true;
    });
  },
});
