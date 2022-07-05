import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { useNavigate } from "react-router-dom";
import { addDepart } from "../../redux/departmentSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { getACd, getAllQuestion, reset } from "../../redux/questionSlice";
import {
  addDiagnose,
  getDiagByQuestion,
  getDiagnoseByQuery,
} from "../../redux/diagnoseSlice";
import { createTreatment } from "../../redux/treatmentSlice";
import { getByRole } from "../../redux/authSlice";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
  fontFamily: "Josefin Sans",
};
const AddTreatmentMain = () => {
  const { userInfo, situation: questionCd } = useSelector(
    (state) => state.auth
  );
  const { listDiagnose } = useSelector((state) => state.diagnose);
  const { addSuccess, error } = useSelector((state) => state.treatment);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState(" ");
  // const [desc, setDesc] = useState("")
  const [isTrue, setIsTrue] = useState(false);
  const [situation, setSituation] = useState(undefined);
  const [diagnose, setDiagnose] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = userInfo?.token;
    dispatch(getByRole(token));
    dispatch(getDiagByQuestion(query));
    if (addSuccess) {
      toast.success("Them moi thanh cong", ToastObjects);
      dispatch(reset());
    }
    if (error) {
      toast.error("Them moi that bai", ToastObjects);
      dispatch(reset());
    }
  }, [dispatch, situation, addSuccess, error]);
  const [desc, setDesc] = useState(null);
  const handleChangeDesc = (content) => {
    setDesc(content);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const treatment = {
      name: name,
      desc: desc,
      note: note,
      isTrue: isTrue,
      situation: situation,
      diagnose: diagnose,
    };
    const token = userInfo?.token;
    // console.log(treatment)
    dispatch(createTreatment({ treatment, token }));
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
    setSituation(e.target.value);
  };
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          // disabled={!formik.dirty}
        >
          <div className="content-header">
            <Link to="/treatment" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm cách điều trị</h2>
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
                    <textarea
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      // rows="4"
                      name="name"
                      value={name}
                      style={{ width: "100%" }}
                      // required
                      onChange={(e) => setName(e.target.value)}
                    ></textarea>
                  </div>

                  <h6>Mô tả</h6>
                  <SunEditor
                    className="mb-4 "
                    onChange={handleChangeDesc}
                    setOptions={{ buttonList: buttonList.complex, height: 500 }}
                  />
                  <h6 className="mt-4">Kết quả điều trị</h6>
                  <div className="mb-4  button-group">
                    <div
                      className={`button-check ${isTrue ? "isCheck" : ""}`}
                      onClick={() => setIsTrue(true)}
                    >
                      {" "}
                      Thành công
                    </div>
                    <div
                      className={`button-check ${
                        isTrue == false ? "isCheck" : ""
                      }`}
                      onClick={() => setIsTrue(false)}
                    >
                      Thất bại
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Chú ý</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      name="note"
                      value={note}
                      // required
                      onChange={(e) => setNote(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <select
                      className="form-control mt-3"
                      name="situation"
                      value={situation}
                      onChange={handleChange}
                    >
                      <option value="">Tình huống</option>
                      {questionCd?.length == undefined ? (
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
                      value={diagnose}
                      onChange={(e) => setDiagnose(e.target.value)}
                    >
                      <option value="">Chẩn đoán</option>
                      {listDiagnose?.length == undefined ? (
                        <>
                          <option value={listDiagnose?._id}>
                            {listDiagnose?.name}
                          </option>
                        </>
                      ) : (
                        listDiagnose?.map((item) => (
                          <option value={item?._id} key={item._id}>
                            {item?.name}
                          </option>
                        ))
                      )}
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

export default AddTreatmentMain;
