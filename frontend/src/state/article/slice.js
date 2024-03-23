import { createSlice } from "@reduxjs/toolkit";
import { deleteArticles, fetchArticles } from "./thunk";

const initialState = {
  isLoading: false,
  articles: [],
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = [...action.payload];
      })

      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        const { error } = action.payload;
      });

    builder
      .addCase(deleteArticles.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = [...action.payload];
      })
      .addCase(deleteArticles.rejected, (state, action) => {
        state.isLoading = false;
        const { error } = action.payload;
      });
  },
});

const articleReducer = articleSlice.reducer;

export default articleReducer;
