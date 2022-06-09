import React, { useEffect, useState } from "react";
import Message from "./../components/LoadingError/Error";
import Loading from "./../components/LoadingError/Loading";
import Toast from "./../components/LoadingError/Toast";
import {useFormik} from 'formik'
import * as yup from 'yup'
import { loginRequest } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../redux/authSlice";
const Login = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading: pending, error, msg } = useSelector(state => state.auth)
  const formik = useFormik({
    initialValues:{
      email: "",
      password: ""
    },
    validationSchema: yup.object({
      email: yup.string().email().required("required"),
      password: yup.string().required("required")
    }),
    onSubmit: (values)=> {
      const user = {
        email: values.email,
        password: values.password
      }
      // loginRequest(dispatch,navigate, user)
      dispatch(logIn({user, navigate}))
    }
  })
  return (
    <>
      
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          <h4 className="card-title mb-4 text-center">Đăng nhập</h4>
          {pending ? <Loading /> : error && <Message variant="alert-danger">{msg}</Message>}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Mật khẩu"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
