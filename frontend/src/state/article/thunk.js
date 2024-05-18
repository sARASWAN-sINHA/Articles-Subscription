import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArticles = createAsyncThunk(
  "articleState/fetchArticles",
  async (_, { rejectWithValue }) => {
    let options = {
      headers: {
        Authorization: "JWT " + localStorage.getItem("access_token"),
      },
    };
    try {
      const resp = await axios.get(`${import.meta.env.VITE_BACKEND_IP}/article`, options);
      return resp.data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const deleteArticles = createAsyncThunk(
  "articleState/deleteArticles",
  async (articleId, { rejectWithValue }) => {
    let options = {
      headers: {
        Authorization: "JWT " + localStorage.getItem("access_token"),
      },
    };
    try {
      const deleteResp = await axios.delete(
        `${import.meta.env.VITE_BACKEND_IP}/article/${articleId}`,
        options
      );
      if (deleteResp.status == "204") {
        const resp = await axios.get(`${import.meta.env.VITE_BACKEND_IP}/article`, options);
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
  "articleState/createArticle",
  async (payload, thunkApi) => {
    let options = {
      headers: {
        Authorization: "JWT " + localStorage.getItem("access_token"),
      },
    };
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_BACKEND_IP}/article/`,
        payload,
        options
      );
      return resp.data;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "articleState/updateArticle",
  async (payload, thunkApi) => {
    let options = {
      headers: {
        Authorization: "JWT " + localStorage.getItem("access_token"),
      },
    };
    try {
      const resp = await axios.patch(
        `${import.meta.env.VITE_BACKEND_IP}/article/${payload.id}`,
        payload,
        options
      );
      return resp.data;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
