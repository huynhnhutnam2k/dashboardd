import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./url";
const URL_API = URL;
export const userLocalStorage = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : null;
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: userLocalStorage,
    loginSuccess: false,
    loading: false,
    error: false,
    success: false,
    addUserSuccess: false,
    listUsers: [],
    deleteSuccess: false,
    user: {},
    msg: "",
    situation: null,
    department: null,
  },
  reducers: {
    // loginStart: state =>{
    //     state.login.pending = true
    // },
    // loginSuccess : (state, action) => {
    //     state.login.user = action.payload
    //     state.login.pending = false
    //     state.login.error = false
    // },
    // loginFail : (state, action)=> {
    //     state.login.pending = false
    //     state.login.error = true
    //     state.login.msg = action.payload
    // },
    // getAllUserStart : state=> {
    //     state.getAllUser.pending = true
    // },
    // getAllUserAccess: (state, action) => {
    //     state.getAllUser.user = action.payload
    //     state.getAllUser.error = false
    //     state.getAllUser.pending = false
    // },
    // getAllUserFail: state => {
    //     state.getAllUser.error = true
    // },
    // registerStart: state => {
    //     state.register.pending = true
    // },
    // registerAccess: (state) => {
    //     // state.register.user = action.payload
    //     state.register.pending = false
    //     state.register.error = false
    // },
    // registerFail: (state, action) => {
    //     state.register.error = action.payload
    // },
    // logoutStart: state => {
    //     state.logout.pending = true
    // },
    // logoutAccess: state => {
    //     state.logout.pending = false
    //     state.logout.error = false
    //     state.logout.success = true
    // },
    // logoutFail: state => {
    //     state.logout.error =true
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loginSuccess = true;
        state.loading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.msg = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.addUserSuccess = true;
        // state.user = action.payload
        state.loading = false;
      })
      .addCase(addUser.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.listUsers = action.payload;
        state.loading = false;
      })
      .addCase(getAllUser.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        localStorage.removeItem("user");
        state.loginSuccess = false;
        state.userInfo = null;
        document.location.href = "/login";
      })
      .addCase(logOut.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(getByRole.pending, (state) => {
        state.pending = true;
      })
      .addCase(getByRole.fulfilled, (state, action) => {
        state.department = action.payload?.department;
        state.situation = action.payload?.situation;
        state.pending = false;
      })
      .addCase(getByRole.rejected, (state) => {
        state.pending = false;
        state.error = true;
      }).addCase(deleteUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.deleteSuccess = true;
        state.pending = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const logIn = createAsyncThunk("auth/login", async ({ user }) => {
  try {
    const res = await axios.post(`${URL_API}/user/login`, user, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "origin, x-requested-with, content-type",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
      },
    });
    if (res) {
      localStorage.setItem("user", JSON.stringify(res.data));
      document.location.href = "/";
      return res.data;
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
});


export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async ({ token, id }) => {
    console.log(token, id)
    try {
      const res = await axios.post(`${URL_API}/user/deleteuser/${id}`, {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
)
export const addUser = createAsyncThunk(
  "auth/register",
  async ({ token, user }) => {
    try {
      console.log(token, user)
      const res = await axios.post(`${URL_API}/user/register`, user, {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Headers":
          //   "origin, x-requested-with, content-type",
          // "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        },
      });
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const getAllUser = createAsyncThunk("auth/getAll", async (token) => {
  try {
    const { data } = await axios.get(`${URL_API}/user`, {
      headers: {
        token: `Bearer ${token}`,
        Vary: "Origin",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "origin, x-requested-with, content-type",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
      },
    });
    return data;
  } catch (error) {
    console.log(error.response.data?.message);
  }
});

export const logOut = createAsyncThunk("auth/logOut", async ({ token, id }) => {
  try {
    const res = await axios.post(`${URL_API}/user/logout`, id, {
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
    console.log(error.response.data.message);
  }
});
export const getByRole = createAsyncThunk("auth/getByRole", async (token) => {
  try {
    const res = await axios.get(`${URL_API}/user/role`, {
      headers: {
        token: `Bearer ${token}`,
        Vary: "Origin",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "origin, x-requested-with, content-type",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
});
export default authSlice.reducer;
