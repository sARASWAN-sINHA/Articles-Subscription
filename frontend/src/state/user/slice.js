import { createSlice } from "@reduxjs/toolkit";
import { createUser, updateArticle } from "./thunk";

const initialState = {
  user: {
    id: null,
    email: "",
    first_name: "",
    last_name: null,
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

    builder
      .addCase(updateArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...action.payload };
      })
      .addCase(updateArticle.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const userReducer = userSlice.reducer;
export default userSlice;
