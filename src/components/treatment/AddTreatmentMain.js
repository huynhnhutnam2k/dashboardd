import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup  from 'yup'
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { useNavigate} from 'react-router-dom'
import { addDepart } from "../../redux/departmentSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { getACd, getAllQuestion } from "../../redux/questionSlice";
import { addDiagnose, getDiagByQuestion, getDiagnoseByQuery } from "../../redux/diagnoseSlice";
import { createTreatment } from "../../redux/treatmentSlice";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const AddTreatmentMain = () => {

    const {userInfo} = useSelector(state => state.auth) 
    const {questionCd} = useSelector(state => state.question)
    const {listDiagnose} = useSelector(state => state.diagnose)
    const [query, setQuery ] = useState("")
    const [name, setName] = useState("")
    const [note, setNote] = useState("")
    const [desc, setDesc] = useState("")
    const [result, setResult] = useState("")
    const [questionId, setQuestionId] = useState()
    const [diagnoseId, setDiagnoseId] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const token = userInfo?.token
        dispatch(getACd(token))
        // dispatch(getAllQuestion())
        dispatch(getDiagByQuestion(query))
    },[dispatch, questionId])
    // us

    console.log(listDiagnose)
    const handleSubmit = (e) => {
      e.preventDefault()
      const treatment = {
        name: name,
        desc: desc, 
        note: note, 
        result: result,
        questionId: questionId,
        diagnoseId: diagnoseId
      }
      // console.log(name, desc, note, result, questionId, diagnoseId)
      const token = userInfo?.token
      dispatch(createTreatment({treatment, token}))
    }
    const handleChange = (e) => {
      setQuery(e.target.value)
      setQuestionId(e.target.value)
    }
  return (
    <>
        <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleSubmit}  encType="multipart/form-data">
          <div className="content-header">
            <Link to="/department" className="btn btn-danger text-white">
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
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      // rows="4"
                      name="name"
                      value={name}
                      // required
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Mô tả</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      name="desc"
                      value={desc}
                      // required
                      onChange={e => setDesc(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Kết quả</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      name="result"
                      value={result}
                      // required
                      onChange={e => setResult(e.target.value)}
                    ></input>
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
                      onChange={e => setNote(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <select className="form-control mt-3" name="questionId" value={questionId} onChange={handleChange}>
                      <option value="">Tình huống</option>
                      {questionCd?.length == undefined ? 
                        <>
                          <option value={questionCd?._id}>{questionCd?.name}</option>
                        </>
                        : 
                        questionCd?.map(item => (
                        <option value={item?._id}>{item?.name}</option>
                        )
                        )}
                    </select>
                  </div>
                  <div className="mb-4">
                    <select className="form-control mt-3" name="diagnoseId" value={diagnoseId} onChange={e => setDiagnoseId(e.target.value)}>
                      <option value="">Chẩn đoán</option>
                      {listDiagnose?.length == undefined ? 
                        <>
                          <option value={listDiagnose?._id}>{listDiagnose?.name}</option>
                        </>
                        : 
                        listDiagnose?.map(item => (
                        <option value={item?._id}>{item?.name}</option>
                        )
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
  )
}

export default AddTreatmentMain