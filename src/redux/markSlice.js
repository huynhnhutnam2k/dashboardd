import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./url";
const URL_API = `${URL}/marks`;


export const getAllMark = createAsyncThunk(
  "mark/fetchAll",
  async () => {
    try {
      const res = await axios.get(`${URL_API}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        }
      });
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);



export const markSlice = createSlice({
  name: "mark",
  initialState: {
    listMark: [],
    mark: {},
    pending: false,
    success: false,
    error: false,
    msg: ''
  },
  extraReducers: builder => {
    builder
      .addCase(getAllMark.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllMark.fulfilled, (state, action) => {
        state.listMark = action.payload;
        state.pending = false;
      })
      .addCase(getAllMark.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
  }
})
export default markSlice.reducer;