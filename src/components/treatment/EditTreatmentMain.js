import React, { useEffect, useLayoutEffect, useState } from "react";
import Toast from "../LoadingError/Toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getDiagByQuestion } from "../../redux/diagnoseSlice";
import { getACd, reset } from "../../redux/questionSlice";
import { fetchOneTreatment, updateTreatment } from "../../redux/treatmentSlice";
import { getByRole } from "../../redux/authSlice";
import SunEditor, { buttonList } from "suneditor-react";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const EditTreatmentMain = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { treatment, pending, updateSuccess } = useSelector(
    (state) => state.treatment
  );
  const { situation: situationRole } = useSelector((state) => state.auth);
  const [editDesc, setEditDesc] = useState(false);
  const [query, setQuery] = useState(treatment?.situation?._id);
  const [isTrue, setIsTrue] = useState(treatment.isTrue);
  useEffect(() => {
    const token = userInfo?.token;
    dispatch(getByRole(token));
    dispatch(fetchOneTreatment(id));
    dispatch(getDiagByQuestion(query));
    if (updateSuccess) {
      toast.success("Cập nhật tình huống thành công!!!", ToastObjects);
      dispatch(reset());
    }
  }, [dispatch, query, updateSuccess]);
  const { listDiagnose } = useSelector((state) => state.diagnose);
  const [desc, setDesc] = useState(treatment?.desc);
  const formik = useFormik({
    initialValues: {
      desc: treatment?.desc,
      name: treatment?.name,
      note: treatment?.note,
      isTrue: treatment?.isTrue,
      situation: treatment?.situation,
      diagnose: treatment?.diagnose,
    },

    validationSchema: yup.object({}),
    enableReinitialize: true,
    onSubmit: (values) => {
      let body;
      if (editDesc === false) {
        body = {
          desc: values.desc,
          name: values.name,
          isTrue: values.isTrue,
          situation: values.situation,
          diagnose: values.diagnose,
          note: values.note,
        };
      } else {
        body = {
          desc: desc,
          name: values?.name,
          note: values?.note,
          isTrue: values?.isTrue,
          situation: values?.situation,
          diagnose: values?.diagnose,
        };
      }

      // console.log(body)
      const token = userInfo?.token;
      // console.log(body);
      dispatch(updateTreatment({ id, body, token }));
      // console.log(body);
    },
  });

  const handleChangeDesc = (content) => {
    setDesc(content);
  };
  // console.log(editDesc)
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <div className="content-header">
            <Link to="/treatment" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Cập nhật điều trị</h2>
            <div>
              <button className="btn btn-primary" type="submit">
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
                      <div className="mb-4">
                        <label className="form-label">Mô tả</label>
                        <div
                          className="form-control"
                          dangerouslySetInnerHTML={{
                            __html: `${formik.values.desc}`,
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
                            value: formik.values.desc,
                          }}
                        />
                      )}
                      <h6 className="mt-4">Kết quả điều trị</h6>
                      <div className="mb-4  button-group">
                        <div
                          className={`button-check ${
                            formik.values.isTrue ? "isCheck" : ""
                          }`}
                          onClick={() => formik.setFieldValue("isTrue", true)}
                        >
                          {" "}
                          Đúng
                        </div>
                        <div
                          className={`button-check ${
                            formik.values.isTrue == false ? "isCheck" : ""
                          }`}
                          onClick={() => formik.setFieldValue("isTrue", false)}
                        >
                          Sai
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Chú ý</label>
                        <input
                          placeholder="Nhập vào đây..."
                          className="form-control"
                          rows="4"
                          name="note"
                          value={formik.values.note}
                          onChange={formik.handleChange}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <select
                          className="form-control mt-3"
                          name="situation"
                          value={formik.values.situation}
                          onChange={(e) => {
                            setQuery(e.target.value);
                            formik.handleChange(e);
                          }}
                        >
                          <option value={treatment?.situation?._id}>
                            {treatment?.situation?.name}
                          </option>
                          {situationRole?.map((item) =>
                            item._id !== treatment?.situation?._id ? (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            ) : null
                          )}
                        </select>
                      </div>
                      <div className="mb-4">
                        <select
                          className="form-control mt-3"
                          name="diagnose"
                          value={formik.values.diagnose}
                          onChange={formik.handleChange}
                        >
                          {listDiagnose?.map((item) =>
                            item._id !== treatment?.diagnose?._id ? (
                              <option value={item?._id}>{item?.name}</option>
                            ) : null
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

export default EditTreatmentMain;
