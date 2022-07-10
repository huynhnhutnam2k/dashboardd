import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./url";
const URL_API = `${URL}/treatment`;

export const treatmentSlice = createSlice({
  name: "treatment",
  initialState: {
    listTreatment: [],
    treatment: {},
    pending: false,
    error: false,
    success: false,
    addSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
    page: 1,
    maxPage: 1,
  },
  reducers: {
    incrementTreatment: (state) => {
      state.page += 1;
    },
    decrementTreatment: (state) => {
      state.page -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreatment.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchTreatment.fulfilled, (state, action) => {
        state.listTreatment = action.payload.treatment;
        state.maxPage = action.payload.maxPage;
        state.pending = false;
      })
      .addCase(fetchTreatment.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })

      .addCase(fetchOneTreatment.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchOneTreatment.fulfilled, (state, action) => {
        state.treatment = action.payload;
        state.pending = false;
      })
      .addCase(fetchOneTreatment.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(createTreatment.pending, (state) => {
        state.pending = true;
      })
      .addCase(createTreatment.fulfilled, (state, action) => {
        state.pending = false;
        state.treatment = action.payload;
        state.addSuccess = true;
      })
      .addCase(createTreatment.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })

      .addCase(updateTreatment.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateTreatment.fulfilled, (state) => {
        state.pending = false;
        state.updateSuccess = true;
      })
      .addCase(updateTreatment.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(deleteTreatment.pending, (state) => {
        state.pending = true;
      })
      .addCase(deleteTreatment.fulfilled, (state) => {
        state.pending = false;
        state.deleteSuccess = true;
      })
      .addCase(deleteTreatment.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const fetchTreatment = createAsyncThunk(
  "treatment/getAll",
  async (arg, { getState }) => {
    try {
      const {
        treatment: { page },
      } = getState();
      const res = await axios.get(`${URL_API}?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        },
      });
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const fetchOneTreatment = createAsyncThunk(
  "treatment/getOne",
  async (id) => {
    try {
      const res = await axios.get(`${URL_API}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        },
      });

      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const createTreatment = createAsyncThunk(
  "treatment/create",
  async ({ treatment, token }) => {
    try {
      const res = await axios.post(`${URL_API}`, treatment, {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        },
      });
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const updateTreatment = createAsyncThunk(
  "treatment/update",
  async ({ body, id, token }) => {
    try {
      const res = await axios.put(`${URL_API}/${id}`, body, {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        },
      });
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const deleteTreatment = createAsyncThunk(
  "treatment/delete",
  async ({ id, token }) => {
    try {
      const res = await axios.delete(`${URL_API}/${id}`, {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        },
      });
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const { incrementTreatment, decrementTreatment } =
  treatmentSlice.actions;
export default treatmentSlice.reducer;
