import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { io } from "socket.io-client";

// Socket.IO connection
let socket;

export const setupSocketConnection = createAsyncThunk(
  "auth/setupSocketConnection",
  async (userId, { dispatch }) => {
    socket = io(
      import.meta.env.NODE_ENV === "production"
        ? "your render backend url"
        : "http://localhost:5005",
      {
        query: { userId },
      }
    );

    // socket.on("connect", () => {
    //   console.log("Connected to Socket.IO server");
    // });

    socket.on("getOnlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    return userId;
  }
);

export const disconnectSocket = createAsyncThunk(
  "auth/disconnectSocket",
  async () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
    return null;
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (FormData, thunkAPI) => {
    try {
      const res = await axios.post("/auth/signup", FormData);
      thunkAPI.dispatch(setupSocketConnection(res.data._id));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration Failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", formData);
      thunkAPI.dispatch(setupSocketConnection(res.data._id));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login Failed"
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/check-auth",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/auth/check-auth");
      thunkAPI.dispatch(setupSocketConnection(res.data._id));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Not Authenticated.", error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    thunkAPI.dispatch(disconnectSocket());
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout Failed"
    );
  }
});

export const updateProfile = createAsyncThunk(
  "auth/update-profile",
  async (updatedData, thunkAPI) => {
    try {
      const res = await axios.put("/auth/update-profile", updatedData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Profile Updation Failed"
      );
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  onlineUsers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // CHECK-AUTH
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.onlineUsers = [];
      })
      // UPDATE-PROFILE
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
export { socket };