import React, { useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../LoadingError/Loading";
import * as yup from 'yup'
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/questionSlice";
import { aDepart, editDepart } from "../../redux/departmentSlice";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const EditDepartMain = () => {


  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const { id } = useParams()
  const { department, pending, updateSuccess } = useSelector(state => state.department)
  const token = userInfo.token
  useEffect(() => {
    dispatch(aDepart(id))
    if (updateSuccess) {
      toast.success("Cập nhật thành công", ToastObjects)
      dispatch(reset())
    }
  }, [dispatch, updateSuccess, id])
  const formik = useFormik({
    initialValues: {
      name: department?.name || "",
    },
    validationSchema: yup.object({
    }),
    enableReinitialize: true,
    onSubmit: values => {
      const body = {
        name: values.name,
      }
      dispatch(editDepart({ body, token, id }))
    }
  })
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={formik.handleSubmit}   >
          <div className="content-header">
            <Link to="/department" className="btn btn-danger text-white">
              Trở lại
            </Link>
            <h2 className="content-title">Cập nhật chuyên khoa</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {
                    pending ? <Loading /> :
                      <>
                        <div className="mb-4">
                          <label className="form-label">Name</label>
                          <input
                            placeholder="Nhập vào đây..."
                            className="form-control"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                          ></input>
                        </div>

                      </>
                  }
                </div>
              </div>
            </div>
          </div>

        </form>
      </section>
    </>
  )
}

export default EditDepartMain






