import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk(
  "userState/createUser",
  async (payload, thunkApi) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/users/",
        payload,
        options
      );
      return res.data;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "userState/updateUser",
  async (payload, thunkApi) => {
    let options = {
      headers: {
        Authorization: "JWT " + localStorage.getItem("access_token"),
      },
    };
    try {
      const res = await axios.patch(
        `http://127.0.0.1:8000/auth/users/${payload.id}/`,
        payload,
        options
      );
      return res.data;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
