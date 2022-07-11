import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./url";
const URL_API = `${URL}/preliminary`;
// preliminary
export const preliminarySlice = createSlice({
  name: "pre",
  initialState: {
    listPre: [],
    prebysituationid: [],
    pre: {},
    pending: false,
    error: false,
    addSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
    page: 1,
    maxPage: 1,
  },
  reducers: {
    resetPre: (state) => {
      state.addSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
      state.pending = false;
      state.error = false;
      state.listPre = [];
      state.pre = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPre.pending, (state) => {
        state.pending = true;
      })
      .addCase(addPre.fulfilled, (state, action) => {
        state.addSuccess = true;
        state.pending = false;
        state.error = false;
      })
      .addCase(addPre.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(updatePre.pending, (state) => {
        state.pending = true;
      })
      .addCase(updatePre.fulfilled, (state, action) => {
        state.updateSuccess = true;
        state.pending = false;
        state.error = false;
      })
      .addCase(updatePre.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(deletePre.pending, (state) => {
        state.pending = true;
      })
      .addCase(deletePre.fulfilled, (state, action) => {
        state.deleteSuccess = true;
        state.pending = false;
        state.error = false;
      })
      .addCase(deletePre.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(getPre.pending, (state) => {
        state.pending = true;
      })
      .addCase(getPre.fulfilled, (state, action) => {
        state.pre = action.payload;
        state.pending = false;
        state.error = false;
      })
      .addCase(getPre.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(getListPre.pending, (state) => {
        state.pending = true;
      })
      .addCase(getListPre.fulfilled, (state, action) => {
        state.listPre = action.payload;
        state.pending = false;
        state.error = false;
      })
      .addCase(getListPre.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(searchPre.pending, (state) => {
        state.pending = true;
      })
      .addCase(searchPre.fulfilled, (state, action) => {
        state.listPre = action.payload;
        state.pending = false;
        state.error = false;
      })
      .addCase(searchPre.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(getPreliminariesBySituation.pending, (state) => {
        state.pending = true;
      })
      .addCase(getPreliminariesBySituation.fulfilled, (state, action) => {
        state.prebysituationid = action.payload;
        state.pending = false;
        state.error = false;
      })
      .addCase(getPreliminariesBySituation.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      ;
  },
});

export const addPre = createAsyncThunk(
  "pre/addPre",
  async (pre, token) => {
    try {
      const response = await axios.post(`${URL_API}`, pre, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  } // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
);
export const updatePre = createAsyncThunk(
  "pre/updatePre",
  async ({ id, body, token }) => {
    console.log(`${URL_API}/${id}`, "id:", id)
    try {
      const response = await axios.put(`${URL_API}/${id}`, body, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  } // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
);
export const deletePre = createAsyncThunk(
  "pre/deletePre",
  async ({ id, token }) => {
    try {
      const response = await axios.delete(`${URL_API}/${id}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  } // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
);
export const getPre = createAsyncThunk(
  "pre/getPre",
  async (id) => {
    try {
      const response = await axios.get(`${URL_API}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  } // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
);
export const getListPre = createAsyncThunk(
  "pre/getListPre",
  async (situation, { getState }) => {
    try {
      const {
        pre: { page },
      } = getState();
      const response = await axios.get(
        URL + "/preliminary?page=" + page + "&situation=" + situation
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  } // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
);
export const getPreliminariesBySituation = createAsyncThunk(
  "pre/getbysituation",
  async (id) => {
    console.log(`${URL_API}/getbysituationid/${id}`)
    try {
      const response = await axios.get(`${URL_API}/getbysituationid/${id}`);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
)

export const searchPre = createAsyncThunk(
  "pre/searchPre",
  async (search) => {
    try {
      const response = await axios.get(
        URL + "/preliminary/search?keyword=" + search
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  } // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
);
export const { resetPre } = preliminarySlice.actions;
export default preliminarySlice.reducer;
