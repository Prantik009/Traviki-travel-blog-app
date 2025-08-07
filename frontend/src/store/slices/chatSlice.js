import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

export const getUsersForSidebar = createAsyncThunk(
  "chat/getUsersForSidebar",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/message/get-all-users");
      return res.data;
    } catch (error) {
      toast.error("Can't fetch users");
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (receiverId, thunkAPI) => {
    try {
      const res = await axios.get(`/message/${receiverId}`);
      return res.data.messages_between_sender_receiver;
    } catch (error) {
      toast.error("Can't fetch messages");
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ receiverId, text, image }, thunkAPI) => {
    try {
      const res = await axios.post(`/message/send/${receiverId}`, {
        text,
        image,
      });
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
      return thunkAPI.rejectWithValue("Message Send Failed");
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    users: [],
    selectedUser: null,
    messages: [],
    isUserLoading: false,
    isMessageLoading: false,
    error: null,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.messages = [];
    },
    addNewMessage: (state, action) => {
      if (
        state.selectedUser &&
        (action.payload.senderId === state.selectedUser._id ||
          action.payload.receiverId === state.selectedUser._id)
      ) {
        state.messages.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersForSidebar.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(getUsersForSidebar.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsersForSidebar.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.payload;
      })
      .addCase(getMessages.pending, (state) => {
        state.isMessageLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isMessageLoading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isMessageLoading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { setSelectedUser, addNewMessage } = chatSlice.actions;
export default chatSlice.reducer;