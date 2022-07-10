import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./url";
const URL_API = `${URL}/diagnose`;
export const getAllDiag = createAsyncThunk(
  "diagnose/getAll",
  async (page, { getState }) => {
    try {
      const {
        diagnose: { page },
      } = getState();
      console.log(page);
      const res = await axios.get(`${URL_API}/diagnose?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        },
      });
      return res.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const getADiag = createAsyncThunk("diagnose/getOne", async (id) => {
  try {
    const res = await axios.get(`${URL_API}/diagnose/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "origin, x-requested-with, content-type",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
});
export const getDiagByQuestion = createAsyncThunk(
  "diagnose/getByQuestion",
  async (query) => {
    try {
      const { data } = await axios.get(`${URL_API}/diagnose?situationId=${query}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        },
      });
      return data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
// export const getDiagnoseByQuery = createAsyncThunk(
//     "diagnose/getByQuery",
//     async(query) => {
//         try{
//             const res = await axios.get(`${URL_API}/diagnose/search?${query}`,{
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Access-Control-Allow-Origin": "*",
// "Access-Control-Allow-Headers":
//             "origin, x-requested-with, content-type",
//           "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
//                 }
//             })
//             return res.data
//         }catch(error){
//             console.log(error.response.data)
//         }
//     }
// )
export const addDiagnose = createAsyncThunk(
  "diagnose/add",
  async ({ body, token }) => {
    try {
      const res = await axios.post(`${URL_API}/diagnose`, body, {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        },
      });
      return res.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const upDiagnose = createAsyncThunk(
  "diagnose/update",
  async ({ id, body, token }) => {
    try {
      const { data } = await axios.put(`${URL_API}/diagnose/${id}`, body, {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        },
      });
      return data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const delDiagnose = createAsyncThunk(
  "diagnose/del",
  async ({ id, token }) => {
    try {
      const res = await axios.delete(`${URL_API}/diagnose/${id}`, {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        },
      });
      return res.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const diagnoseSlice = createSlice({
  name: "diagnose",
  initialState: {
    allDiagnose: [],
    listDiagnose: [],
    diagnose: {},
    pending: false,
    success: false,
    error: false,
    addSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
    page: 1,
    maxPage: 1,
  },
  reducers: {
    incrementDiagnose: (state) => {
      state.page += 1;
    },
    decrementDiagnose: (state) => {
      state.page -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDiag.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllDiag.fulfilled, (state, action) => {
        state.listDiagnose = action.payload.diagnose;
        state.maxPage = action.payload.maxPage;
        state.pending = false;
      })
      .addCase(getAllDiag.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(getADiag.pending, (state) => {
        state.pending = true;
      })
      .addCase(getADiag.fulfilled, (state, action) => {
        state.diagnose = action.payload;
        state.pending = false;
      })
      .addCase(getADiag.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(getDiagByQuestion.pending, (state) => {
        state.pending = true;
      })
      .addCase(getDiagByQuestion.fulfilled, (state, action) => {
        state.listDiagnose = action.payload;
        state.pending = false;
      })
      .addCase(getDiagByQuestion.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(addDiagnose.pending, (state) => {
        state.pending = true;
      })
      .addCase(addDiagnose.fulfilled, (state, action) => {
        state.diagnose = action.payload;
        state.addSuccess = true;
        state.pending = false;
      })
      .addCase(addDiagnose.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(upDiagnose.pending, (state) => {
        state.pending = true;
      })
      .addCase(upDiagnose.fulfilled, (state, action) => {
        state.updateSuccess = true;
        state.pending = false;
      })
      .addCase(upDiagnose.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(delDiagnose.pending, (state) => {
        state.pending = true;
      })
      .addCase(delDiagnose.fulfilled, (state, action) => {
        state.deleteSuccess = true;
        state.pending = false;
      })
      .addCase(delDiagnose.rejected, (state) => {
        state.error = true;
        state.pending = false;
      });
    // .addCase(getDiagnoseByQuery.pending , state => {
    //     state.pending = true
    // })
    // .addCase(getDiagnoseByQuery.fulfilled, (state , action) => {
    //     state.listDiagnose = action.payload
    //     state.pending = false
    // })
    // .addCase(getDiagnoseByQuery.rejected, state => {
    //     state.pending = false
    //     state.error = true
    // })
  },
});

export const { incrementDiagnose, decrementDiagnose } = diagnoseSlice.actions;
export default diagnoseSlice.reducer;
