import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import Toast from "../LoadingError/Toast";
import { addDepart } from "../../redux/departmentSlice";
import { reset } from "../../redux/questionSlice";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const AddDepartmentMain = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { addSuccess } = useSelector((state) => state.department);
  useEffect(() => {
    if (addSuccess) {
      toast.success("Thêm mới thành công!!!", ToastObjects);
      dispatch(reset());
    }
  }, [dispatch, addSuccess]);
  console.log(addSuccess);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Nhập tên chuyên khoa"),
    }),
    onSubmit: (values, { resetForm }) => {
      const body = {
        name: values.name,
      };
      if (userInfo.token) {
        const token = userInfo.token;
        // console.log(body, token)
        dispatch(addDepart({ body, token })).then(resetForm());
      }
    },
  });
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
          disabled={!formik.dirty}
        >
          <div className="content-header">
            <Link to="/department" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm chuyên khoa</h2>
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
                    <label className="form-label">Tên</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      // rows="4"
                      name="name"
                      value={formik.values.name}
                      // required
                      onChange={formik.handleChange}
                    ></input>
                    {formik.errors.name && formik.touched.name && (
                      <p style={{ color: "red" }}>*{formik.errors.name}</p>)}
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

export default AddDepartmentMain;
