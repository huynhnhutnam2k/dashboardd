import React, { useEffect, useLayoutEffect, useState } from "react";
import Toast from "../LoadingError/Toast";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../LoadingError/Loading";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getADiag, upDiagnose } from "../../redux/diagnoseSlice";
import { getByRole } from "../../redux/authSlice";
import { getAllQuestion, reset } from "../../redux/questionSlice";
import { getPreliminariesBySituation } from "../../redux/preliminarySlice"
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};

const EditDiagnoseMain = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { listQuestion: questionCd } = useSelector((state) => state.question);
  const { diagnose, pending, updateSuccess, error } = useSelector(
    (state) => state.diagnose
  );
  const token = userInfo?.token
  const { prebysituationid } = useSelector((state) => state.pre)
  const formik = useFormik({
    initialValues: {
      name: diagnose?.name,
      isTrue: diagnose?.isTrue,
      preliminary: diagnose?.preliminary?._id,
      situation: diagnose?.preliminary?.situation?._id
    },
    validationSchema: yup.object({}),
    enableReinitialize: true,
    onSubmit: (values) => {
      let body;
      body = {
        name: values.name,
        desc: values.desc,
        isTrue: values.isTrue,
        preliminary: values.preliminary,
      };

      // console.log(body);
      const token = userInfo?.token;
      dispatch(upDiagnose({ id, body, token }));
      //
    },
  });
  const [query, setQuery] = useState()

  const handleChangeSituation = async (e) => {
    formik.setFieldValue("situation", e.target.value)
    await e.target.value !== "" && setQuery(e.target.value)

  }
  const handleChangePriliminary = async (e) => {
    formik.setFieldValue("preliminary", e.target.value)
  }
  useEffect(() => {
    const apiCall = async () => {
      await dispatch(getPreliminariesBySituation(diagnose?.preliminary?.situation?._id))
    }
    apiCall()
  }, [diagnose?.preliminary?.situation?._id, dispatch])

  useLayoutEffect(() => {
    dispatch(getADiag(id));
    dispatch(getByRole(token));
    dispatch(getAllQuestion());
    query && dispatch(getPreliminariesBySituation(query));
    // !editDesc && setDesc(diagnose?.desc);
    if (updateSuccess) {
      toast.success("Cập nhật thành công", ToastObjects);
      dispatch(reset());
    } if (error) {
      toast.error("Cập nhật thất bại", ToastObjects);
      dispatch(reset());
    }
  }, [dispatch, updateSuccess, error, query, token, id]);

  console.log(formik.values.preliminary, prebysituationid)
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={formik.handleSubmit} enableReinitialize={true}>
          <div className="content-header">
            <Link to="/diagnose" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Cập nhật chẩn đoán xác định</h2>
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
                      <div className="mb-4">
                        <label className="form-label">Tên</label>
                        <input
                          placeholder="Nhập vào đây..."
                          className="form-control"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                        ></input>
                      </div>

                      <h6 className="mt-4">Kết quả chẩn đoán</h6>
                      <div className="mb-4  button-group">
                        <div
                          className={`button-check ${formik.values.isTrue ? "isCheck" : ""
                            }`}
                          onClick={() => formik.setFieldValue("isTrue", true)}
                        >
                          {" "}
                          Đúng
                        </div>
                        <div
                          className={`button-check ${formik.values.isTrue === false ? "isCheck" : ""
                            }`}
                          onClick={() => formik.setFieldValue("isTrue", false)}
                        >
                          Sai
                        </div>
                      </div>

                      <div className="mb-4">
                        <select
                          id="situationSelect"
                          className="form-control mt-3"
                          name="situation"
                          value={formik.values.situation}
                          onChange={handleChangeSituation}
                          defaultValue="formik.values.situation"
                        >
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
                      </div>
                      <div className="mb-4">
                        <select
                          className="form-control mt-3"
                          name="diagnose"
                          value={formik.values.preliminary}
                          onChange={handleChangePriliminary}
                          defaultValue="formik.values.preliminary"
                        >
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

export default EditDiagnoseMain;
