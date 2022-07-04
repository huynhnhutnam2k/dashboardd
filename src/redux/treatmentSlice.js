import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://sv-dhyd.herokuapp.com/api/treatment";

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreatment.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchTreatment.fulfilled, (state, action) => {
        state.listTreatment = action.payload;
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

export const fetchTreatment = createAsyncThunk("treatment/getAll", async () => {
  try {
    const res = await axios.get(`${URL}`, {
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
});

export const fetchOneTreatment = createAsyncThunk(
  "treatment/getOne",
  async (id) => {
    try {
      const res = await axios.get(`${URL}/${id}`, {
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
      const res = await axios.post(`${URL}`, treatment, {
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
      const res = await axios.put(`${URL}/${id}`, body, {
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
      const res = await axios.delete(`${URL}/${id}`, {
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

export default treatmentSlice.reducer;
