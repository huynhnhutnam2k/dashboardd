import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getByRole } from "../../redux/authSlice";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const AddUserMain = () => {
  const { userInfo, addUserSuccess, department } = useSelector(
    (state) => state.auth
  );
  const token = userInfo.token
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getByRole(token));
    if (addUserSuccess) {
      toast.success("Thêm mới thành công!!!", ToastObjects);
    }
  }, [dispatch, addUserSuccess, token]);
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      role: "",
      isAdmin: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Required"),
      password: yup
        .string()
        .min(8, "Must be 8 character or more")
        .required("Required"),
      username: yup.string().required("Required"),
      role: yup.string().default("User"),
      isAdmin: yup.string().default("false"),
    }),
    onSubmit: (values, { resetForm }) => {
      const user = {
        username: values.username,
        password: values.password,
        email: values.email,
        role: values.role,
        isAdmin: values.isAdmin,
      };
      const token = userInfo?.token;
      console.log(token, user)
      dispatch(addUser({ token, user }));
      if (addUserSuccess) {
        toast.success("Thêm mới thành công!!!", ToastObjects);
        // dispatch
      }
      resetForm();
    },
  });
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={formik.handleSubmit} disabled={!formik.dirty}>
          <div className="content-header">
            <Link to="/users" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm nhân viên</h2>
            <div>
              <button className="btn btn-primary" type="submit">
                Thêm
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <label className="form-label">Email</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      value={formik.values.email}
                      name="email"
                      // required
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Username</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      value={formik.values.username}
                      name="username"
                      // required
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      value={formik.values.password}
                      name="password"
                      required
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <select
                      className="form-control mt-3"
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                    >
                      <option value="">Chuyên Khoa</option>
                      {department?.length === undefined ? (
                        <>
                          <option value={department?.name}>
                            {department?.name}
                          </option>
                        </>
                      ) : (
                        department?.map((item) => (
                          <option value={item?.name}>{item?.name}</option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="mb-4">
                    <select
                      className="form-control mt-3"
                      name="isAdmin"
                      value={formik.values.isAdmin}
                      onChange={formik.handleChange}
                    >
                      <option value="">Admin</option>
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddUserMain;
