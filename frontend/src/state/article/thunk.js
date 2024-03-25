import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (_, { rejectWithValue }) => {
    let options = {
      headers: {
        Authorization: "JWT " + localStorage.getItem("access_token"),
      },
    };
    try {
      const resp = await axios.get("http://127.0.0.1:8000/article", options);
      return resp.data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const deleteArticles = createAsyncThunk(
  "artilces/deleteArticles",
  async (articleId, { rejectWithValue }) => {
    let options = {
      headers: {
        Authorization: "JWT " + localStorage.getItem("access_token"),
      },
    };
    try {
      const deleteResp = await axios.delete(
        `http://127.0.0.1:8000/article/${articleId}`,
        options
      );
      if (deleteResp.status == "204") {
        const resp = await axios.get("http://127.0.0.1:8000/article", options);
        return resp.data;
      } else {
        throw Error("delete operation failed!");
      }
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (payload, thunkApi) => {
    let options = {
      headers: {
        Authorization: "JWT " + localStorage.getItem("access_token"),
      },
    };
    try {
      const resp = await axios.post("http://127.0.0.1:8000/article/", payload, options);  
      if(resp.status != '201'){
        throw thunkApi.rejectWithValue("Something went wrong!")
      }
      return resp.data;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
