import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id: number;
  username: string;
  name: string;
  lastName: string;
  email: string;
  authorities: string[];
}

interface UserState {
  info: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  info: null,
  status: "idle",
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async () => {
    const response = await axios.get(`/api/user/user-info`, {
      withCredentials: true,
    });
    return response.data as User;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.info = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserInfo.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.info = action.payload;
        }
      )
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
