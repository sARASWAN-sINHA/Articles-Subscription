import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk(
  "userState/createUser",
  async (payload, thunkApi) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_IP}/auth/users/`,
        payload,
        // options
      );
      return res.data;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "userState/updateUser",
  async (payload, thunkApi) => {
    let options = {
      headers: {
        Authorization: "JWT " + localStorage.getItem("access_token"),
      },
    };
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_IP}/auth/users/${payload.id}/`,
        payload,
        options
      );
      return res.data;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const getUser = createAsyncThunk(
  "userState/getUser",
  async (userId, thunkApi) => {
    let options = {
      headers: {
        Authorization: "JWT " + localStorage.getItem("access_token"),
      },
    };
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_IP}/auth/users/${userId}/`,
        options
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "userState/deleteUser",
  async (userPassword, thunkApi) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_IP}/auth/users/me/`, 
      {
        data: { current_password: userPassword },
        headers: { Authorization: "JWT " + localStorage.getItem("access_token")},
      }
      );
      return res;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
