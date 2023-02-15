import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (args: any, thunkAPI) => {
    try {
      const { data }: any = await axios.get(
        "https://qn-api.onrender.com/api/post?page=" + args.page,
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
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "post/likePost",
  async (args: any, thunkAPI) => {
    try {
      const { data }: any = await axios.post(
        "https://qn-api.onrender.com/api/post/" + args.post,
        {},
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
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (args: any, thunkAPI) => {
    try {
      const { data }: any = await axios.delete(
        "https://qn-api.onrender.com/api/post/" + args.post,
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
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editPost = createAsyncThunk(
  "post/editPost",
  async (args: any, thunkAPI) => {
    try {
      const { post }: any = thunkAPI.getState();
      const { data }: any = await axios.patch(
        "https://qn-api.onrender.com/api/post/" + args.post,
        {
          content: args.body,
          title: args.title,
          image: args.image || "",
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
      thunkAPI.dispatch(getPost({ post: args.post }));
      return data.data;
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async (args: any, thunkAPI) => {
    try {
      const { data }: any = await axios.get(
        "https://qn-api.onrender.com/api/post/" + args.post,
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
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addPost = createAsyncThunk(
  "post/addPost",
  async (args: any, thunkAPI) => {
    try {
      const { data }: any = await axios.post(
        "https://qn-api.onrender.com/api/post",
        args,
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
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

// https://api.cloudinary.com/v1_1/qurany/image/upload

interface IPost {
  posts: any[];
  post: any;
  loading: boolean;
  error: string;
  totalPages: number;
  deleted: boolean;
  edited: boolean;
  liked: boolean;
}

const initialState: IPost = {
  posts: [],
  liked: false,
  post: {
    likes: [],
  },
  loading: false,
  totalPages: 0,
  error: "",
  deleted: false,
  edited: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removePost: (state) => {
      state.post = {};
    },
    resetEdit: (state) => {
      state.edited = false;
    },
    deleted: (state) => {
      state.deleted = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action: any) => {
      state.loading = true;
      state.posts = [];
    });
    builder.addCase(getPosts.fulfilled, (state, action: any) => {
      state.loading = false;
      state.posts = action.payload.posts;
      // (action.payload);
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(getPosts.rejected, (state, action: any) => {
      state.loading = true;
      state.error = action.error.message;
    });
    builder.addCase(addPost.pending, (state, action: any) => {
      state.loading = true;
    });
    builder.addCase(addPost.fulfilled, (state, action: any) => {
      state.loading = false;
      state.post = action.payload;
    });
    builder.addCase(addPost.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getPost.pending, (state, action: any) => {
      state.loading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action: any) => {
      state.loading = false;
      state.post = action.payload;
    });
    builder.addCase(getPost.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(likePost.fulfilled, (state, action: any) => {
      state.post = action.payload;
      state.liked = false;
    });
    builder.addCase(likePost.pending, (state, action: any) => {
      state.liked = true;
    });
    builder.addCase(deletePost.fulfilled, (state, _) => {
      state.loading = false;
      state.post = {};
      state.post = [];
    });
    builder.addCase(deletePost.pending, (state, action: any) => {
      state.loading = true;
    });
    builder.addCase(editPost.pending, (state, action: any) => {
      state.loading = true;
    });
    builder.addCase(editPost.fulfilled, (state, action: any) => {
      state.edited = true;
    });
    builder.addCase(editPost.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { removePost, deleted, resetEdit } = postSlice.actions;
