import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../../utils/axios"

export const createPost = createAsyncThunk("blog/create", async(blogData, thunkAPI)=> {
  try {
    const res = await axios.post("/post/create-post", blogData)
    return res.data.post
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Post Creation Failed")
  }
})

export const deletePost = createAsyncThunk("blog/delete", async(id, thunkAPI)=> {
  try {
    const res = await axios.delete(`/post/delete-post/${id}`)
    return res.data 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Post Deletion Failed")
  }
})

export const updatePost = createAsyncThunk("blog/update", async({id, updatedData}, thunkAPI)=> {
  try {
    const res = await axios.put(`/post/update-post/${id}`, updatedData);
    return res.data.post;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Post Updation failed")
  }
})

export const getPostBySlug = createAsyncThunk("blog/getOne", async(slug, thunkAPI)=> {
  try {
    const res = await axios.get(`/post/getpost/${slug}`)
    return res.data.post
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Post not found")
  }
})

export const getAllPosts = createAsyncThunk("blog/getAll", async(_, thunkAPI)=> {
  try {
    const res = await axios.get(`/post/getposts`)
    // console.log(res.data.posts);
    
    return res.data.posts
    
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch all posts")
  }
})

export const getMyPost = createAsyncThunk("blog/getMine", async(_, thunkAPI)=> {
  try {
    const res = await axios.get(`/post/my-posts`)
    return res.data.posts
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to get Posts")
  }
})

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    allposts: [],
    myPosts: [],
    currentPost: null,
    loading: null,
    error: null
  },
  reducers: {
    clearCurrentPost: (state)=> {state.currentPost = null},
  },
  extraReducers: (builder)=> {
    builder
    //CREATE POST
    .addCase(createPost.pending, (state)=> {
      state.loading = true
      state.error = null
    })
    .addCase(createPost.fulfilled, (state, action)=> {
      state.loading = false;
      state.myPosts.unshift(action.payload);
      state.allposts.unshift(action.payload);
    })
    .addCase(createPost.rejected, (state, action)=> {
      state.loading = false;
      state.error = action.payload
    })

    //DELETE POST
    .addCase(deletePost.pending, (state)=>{
      state.loading = true
      state.error = null
    })
    .addCase(deletePost.fulfilled, (state, action)=> {
      const selectedId = action.payload._id
      state.loading = false
      state.allposts = state.allposts.filter((post)=> post._id !== selectedId);
      state.myPosts = state.myPosts.filter((post)=> post._id !== selectedId);
    })
    .addCase(deletePost.rejected, (state, action)=> {
      state.loading = false;
      state.error = action.payload
    })

    //UPDATE POST
    .addCase(updatePost.pending, (state)=> {
      state.loading = true
      state.error = null
    })
    .addCase(updatePost.fulfilled, (state, action)=> {
      state.loading = false
      const updated = action.payload
      state.allposts = state.allposts.map((p)=> (p._id === updated._id ? updated : p))
      state.myPosts = state.myPosts.map((p)=> (p._id === updated._id ? updated : p))
      state.currentPost = updated
    })
    .addCase(updatePost.rejected, (state, action)=> {
      state.loading = false;
      state.error = action.payload
    })

    //GET ONE POST
    .addCase(getPostBySlug.pending, (state)=> {
      state.loading = true
      state.error = null
    })
    .addCase(getPostBySlug.fulfilled, (state, action)=> {
      state.loading = false
      state.currentPost = action.payload
    })
    .addCase(getPostBySlug.rejected, (state, action)=> {
      state.loading = false
      state.error = action.payload
    })

    //GET ALL POSTS
    .addCase(getAllPosts.pending, (state)=> {
      state.loading = true
      state.error = null
    })
    .addCase(getAllPosts.fulfilled, (state, action)=> {
      state.loading = false
      state.allposts = action.payload
    })
    .addCase(getAllPosts.rejected, (state, action)=> {
      state.loading = false
      state.error = action.payload
    })

    //GET MY POSTS
    .addCase(getMyPost.pending, (state)=> {
      state.loading = true
      state.error = null
    })
    .addCase(getMyPost.fulfilled, (state, action)=> {
      state.loading = false
      state.myPosts = action.payload
    })
    .addCase(getMyPost.rejected, (state, action)=> {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const {clearCurrentPost} = blogSlice.actions
export default blogSlice.reducer