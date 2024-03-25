import { createSlice } from "@reduxjs/toolkit";
import { createArticle, deleteArticles, fetchArticles } from "./thunk";

const initialState = {
  isLoading: false,
  articles: [],
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * Fetch articles.
     */
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
      });

    /**
     * Delete article.
     */
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
      });

    /**
     * Create article.
     */
    builder
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createArticle.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createArticle.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const articleReducer = articleSlice.reducer;

export default articleReducer;
