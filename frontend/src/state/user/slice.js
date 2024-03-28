import { createSlice } from "@reduxjs/toolkit";
import { createUser, getUser, updateUser } from "./thunk";

const initialState = {
  user: {
    id: null,
    email: "",
    first_name: "",
    last_name: "",
    is_writer: false,
    joined_on: null,
  },
  isLoading: false,
};

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * Create user.
     */
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...action.payload };
      })
      .addCase(createUser.rejected, (state) => {
        state.isLoading = false;
        state.user = { ...initialState };
      });
    /**
     * Update user.
     */

    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...action.payload };
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      });

    /**
     * Fetch user.
     */
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...action.payload };
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const userReducer = userSlice.reducer;
export default userSlice;
