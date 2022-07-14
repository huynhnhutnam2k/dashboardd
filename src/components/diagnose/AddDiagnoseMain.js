import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import { getAllQuestion, reset } from "../../redux/questionSlice";
import { addDiagnose } from "../../redux/diagnoseSlice";
import { getByRole } from "../../redux/authSlice";
import "suneditor/dist/css/suneditor.min.css";
import { getPreliminariesBySituation } from "../../redux/preliminarySlice"
import * as yup from "yup";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const AddDiagnoseMain = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { prebysituationid } = useSelector((state) => state.pre)
  const { addSuccess, error } = useSelector((state) => state.diagnose)
  const { listQuestion: questionCd } = useSelector((state) => state.question)
  const dispatch = useDispatch();
  const [query, setQuery] = useState()
  const token = userInfo?.token

  useEffect(() => {
    dispatch(getAllQuestion())
    dispatch(getByRole(token));
    query && dispatch(getPreliminariesBySituation(query));
    if (addSuccess) {
      toast.success("Them thannh cong", ToastObjects);
      dispatch(reset());
    }
    if (error) {
      toast.error("Them that bai", ToastObjects);
      dispatch(reset());
    }
  }, [token, dispatch, addSuccess, error, query]);
  const [isTrue, setIsTrue] = useState(false);


  const handleChangeSituation = async (e) => {
    formik.setFieldValue("situation", e.target.value)
    await e.target.value !== "" && setQuery(e.target.value)

    console.log(query)

  }
  const handleChangePriliminary = async (e) => {
    formik.setFieldValue("preliminary", e.target.value)
  }



  const formik = useFormik({
    initialValues: {
      name: "",
      situation: "",
      isTrue: isTrue,
      preliminary: ""
    },
    validationSchema: yup.object({
      name: yup.string().required("Vui lòng nhập tên tình huống"),
      situation: yup.string().required("Vui lòng chọn tình huống"),
      preliminary: yup.string().required("Vui lòng chọn chẩn đoán sơ bộ")
    }),
    onSubmit: (values, { resetForm }) => {
      const body = {
        name: values.name,
        situation: values.situation,
        isTrue: isTrue,
        preliminary: values.preliminary

      };
      // console.log(body)
      if (userInfo.token) {
        const token = userInfo.token;
        console.log(body);
        dispatch(addDiagnose({ body, token })).then(resetForm());
        if (addSuccess) {
          toast.success("Thêm mới thành công!!!", ToastObjects);
          // dispatch
        }
      }
    },
    // disabled: !formik.dirty,
  });

  ///


  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
        >
          <div className="content-header">
            <Link to="/diagose" className="btn btn-danger">
              Trở về
            </Link>
            <h2 className="content-title">Thêm chẩn đoán xác định</h2>
            <div>
              <Link to="/add-treatment" className="btn btn-next right">
                Bước tiếp theo
              </Link>
              <div>
                <button className="btn btn-primary" type="submit">
                  Thêm chẩn đoán
                </button></div>
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
                      onChange={formik.handleChange} />
                    {formik.errors.name && formik.touched.name && (
                      <p style={{ color: "red" }}>*{formik.errors.name}</p>)}
                  </div>

                  <div className="mb-4">
                    <select
                      id="situationSelect"
                      className="form-control mt-3"
                      name="situation"
                      value={formik.values.situation}
                      onChange={handleChangeSituation}
                    >
                      <option value="">Tình huống</option>
                      {questionCd?.length === undefined ? (
                        <>
                          <option value={questionCd?._id}>
                            {questionCd?.name}
                          </option>
                        </>
                      ) : (
                        questionCd?.map((item) => (
                          <option value={item?._id}>{item?.name}</option>
                        ))
                      )}
                    </select>
                    {formik.errors.situation && formik.touched.situation && (
                      <p style={{ color: "red" }}>*{formik.errors.situation}</p>)}
                  </div>
                  <div className="mb-4">
                    <select
                      className="form-control mt-3"
                      name="diagnose"
                      value={formik.values.preliminary}
                      onChange={handleChangePriliminary}
                    >
                      <option value="">Chẩn đoán sơ bộ</option>
                      {prebysituationid?.length === undefined ? (
                        <>
                          <option value={prebysituationid?._id}>
                            {prebysituationid?.name}
                          </option>
                        </>
                      ) : (
                        prebysituationid?.map((item) => (
                          <option value={item?._id} key={item._id}>
                            {item?.name}
                          </option>
                        ))
                      )}
                    </select>
                    {formik.errors.preliminary && formik.touched.preliminary && (
                      <p style={{ color: "red" }}>*{formik.errors.preliminary}</p>)}
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Đúng</label>
                    <input
                      placeholder="Nhập vào đây..."
                      // className="form-control"
                      rows="4"
                      name="isTrue"
                      value={isTrue}
                      checked={isTrue}
                      // required
                      style={{
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        flexDerection: "column",
                      }}
                      type="checkbox"
                      onChange={(e) => setIsTrue(!isTrue)}
                    ></input>
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

export default AddDiagnoseMain;
