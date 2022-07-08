import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://sv-dhyd.herokuapp.com/api/situation";
export const questionSlice = createSlice({
  name: "question",
  initialState: {
    listQuestion: [],
    question: {},
    pending: false,
    error: false,
    success: false,
    updateSuccess: false,
    deleteSuccess: false,
    addSuccess: false,
    page: 1,
    maxPage: 1,
  },
  reducers: {
    //get all
    reset: (state) => {
      state.addSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
      state.pending = false;
      state.error = false;
    },
    increment: (state) => {
      state.page += 1;
    },
    decrement: (state) => {
      state.page -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuestion.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllQuestion.fulfilled, (state, action) => {
        state.listQuestion = action.payload.situation;
        state.maxPage = action.payload.maxPage;
        state.pending = false;
        state.success = false;
        state.error = false;
      })
      .addCase(getAllQuestion.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.pending = true;
      })
      .addCase(deleteQuestion.fulfilled, (state) => {
        state.deleteSuccess = true;
        state.pending = false;
        state.success = false;
        state.error = false;
      })
      .addCase(deleteQuestion.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(addQuestion.pending, (state) => {
        state.pending = true;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.addSuccess = true;
        state.pending = false;
        state.question = action.payload;
      })
      .addCase(addQuestion.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.updateSuccess = true;
        state.pending = false;
      })
      .addCase(updateQuestion.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(getQuestionByCate.pending, (state) => {
        state.pending = true;
      })
      .addCase(getQuestionByCate.fulfilled, (state, action) => {
        state.listQuestion = action.payload;
        state.pending = false;
      })
      .addCase(getQuestionByCate.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      // .addCase(getQuestionByDepart.pending , state => {
      //     state.pending= true

      // })
      // .addCase(getQuestionByDepart.fulfilled, (state, action) => {
      //     state.pending = false
      //     state.listQuestion = action.payload
      // })
      // .addCase(getQuestionByDepart.rejected, state => {
      //     state.error = true
      //     state.pending = false
      // })
      .addCase(getAQuestion.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAQuestion.fulfilled, (state, action) => {
        state.question = action.payload;
        state.pending = false;
      })
      .addCase(getAQuestion.rejected, (state) => {
        state.error = true;
        state.pending = false;
      });
  },
});
export const getPage = (state) => state.question.page;
export const getAllQuestion = createAsyncThunk(
  "question/getAll",
  async (page = 1, { getState }) => {
    try {
      const {
        question: { page },
      } = getState();
      const res = await axios.get(`${url}/page/${page}`, {
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
export const getAQuestion = createAsyncThunk("question/get", async (id) => {
  try {
    const res = await axios.get(`${url}/${id}`, {
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

export const updateQuestion = createAsyncThunk(
  "question/update",
  async ({ body, token, id }) => {
    try {
      const res = await axios.put(`${url}/${id}`, body, {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        },
      });
      getAQuestion()
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const addQuestion = createAsyncThunk(
  "question/add",
  async ({ body, token }) => {
    try {
      const res = await axios.post(`${url}`, body, {
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

export const deleteQuestion = createAsyncThunk(
  "question/delete",
  async ({ id, token }) => {
    try {
      const res = await axios.delete(`${url}/${id}`, {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        },
      });
      if (res) {
        return res?.data;
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const getQuestionByCate = createAsyncThunk(
  "question/getByCate",
  async (id) => {
    try {
      const res = await axios.get(`${url}/categories/${id}`);
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
// export const getQuestionByDepart = createAsyncThunk(
//     "question/getByDepart",
//     async(id) => {
//         try {
//             const res = await axios.get(`${url}/department/${id}`)
//             return res?.data
//         } catch (error) {
//             console.log(error.response.data)
//         }
//     }
// )
export const { reset, increment, decrement } = questionSlice.actions;
export default questionSlice.reducer;
