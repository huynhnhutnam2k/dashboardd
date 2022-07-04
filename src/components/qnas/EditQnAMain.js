import React, { useEffect, useLayoutEffect, useState } from "react";
import Toast from "../LoadingError/Toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getACd,
  getAQuestion,
  reset,
  updateQuestion,
} from "../../redux/questionSlice";
import SunEditor, { buttonList } from "suneditor-react";
import { getByRole } from "../../redux/authSlice";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const EditProductMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { id } = useParams();
  // const [file, setFile] = useState('')
  // const handleFileInputChange = (e) => {
  //   const file = e.target.files[0];
  //   previewFile(file);
  // };
  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setFile(reader.result);
  //   };
  // };
  const { question, pending, updateSuccess } = useSelector(
    (state) => state.question
  );
  const { department } = useSelector((state) => state.auth);
  const [editDesc, setEditDesc] = useState(false);
  useLayoutEffect(() => {
    dispatch(getAQuestion(id));
    dispatch(getByRole(userInfo.token));
    if (updateSuccess) {
      toast.success("Cập nhật tình huống thành công!!!", ToastObjects);
      dispatch(reset());
    }
  }, [dispatch, updateSuccess]);
  const [desc, setDesc] = useState(question?.desc);
  // console.log(question);
  const formik = useFormik({
    initialValues: {
      desc: question?.desc,
      name: question?.name,
      departmentId: question?.departmentId?._id,
    },
    validationSchema: yup.object({
      name: yup.string().required("required"),
      departmentId: yup.string(),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      let body;
      if (!editDesc) {
        body = {
          name: values.name,
          desc: values.desc,
          departmentId: values.departmentId?._id,
        };
      } else {
        body = {
          name: values.name,
          desc: desc,
          departmentId: values.departmentId?._id,
        };
      }

      // console.log(body)
      const token = userInfo?.token;
      dispatch(updateQuestion({ body, token, id }));
      // console.log(body);
    },
  });
  const handleChangeDesc = (content) => {
    setDesc(content);
  };
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={formik.handleSubmit}>
          <div className="content-header">
            <Link to="/qnas" className="btn btn-danger text-white">
              Trở lại
            </Link>
            <h2 className="content-title">Cập nhật tình huống</h2>
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
                  {pending ? (
                    <Loading />
                  ) : (
                    <>
                      <h6>Mô tả</h6>
                      <div className="mb-4">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: question?.desc,
                          }}
                        />
                      </div>
                      <h6>Bạn có muốn sửa mô tả không?</h6>
                      <div className="button-group">
                        <div
                          className={`button-check ${
                            editDesc == false ? "isCheck" : ""
                          }`}
                          onClick={() => setEditDesc(false)}
                        >
                          Không
                        </div>
                        <div
                          className={`button-check ${
                            editDesc ? "isCheck" : ""
                          }`}
                          onClick={() => setEditDesc(true)}
                        >
                          Có
                        </div>
                      </div>
                      {editDesc && (
                        <SunEditor
                          className="mb-4"
                          onChange={handleChangeDesc}
                          setOptions={{
                            buttonList: buttonList.complex,
                            height: 500,
                          }}
                        />
                      )}
                      <div className="mb-4 mt-4">
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
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Thuộc khoa</label>
                        <select
                          className="form-control "
                          name="departmentId"
                          value={formik.values.departmentId}
                          onChange={formik.handleChange}
                        >
                          <option value={question?.departmentId?._id}>
                            {question?.departmentId?.name}
                          </option>
                          {department?.map(
                            (item) =>
                              item?._id !== question?.departmentId?._id && (
                                <option value={item._id}>{item.name}</option>
                              )
                          )}
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
