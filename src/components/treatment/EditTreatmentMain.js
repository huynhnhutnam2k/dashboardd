import React, { useEffect, useLayoutEffect, useState } from "react";
import Toast from "../LoadingError/Toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import * as yup from 'yup'
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getDiagByQuestion } from "../../redux/diagnoseSlice";
import { getACd } from "../../redux/questionSlice";
import { fetchOneTreatment } from "../../redux/treatmentSlice";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const EditTreatmentMain = () => {
    
// const user = useSelector(state => state.auth.login?.user)
const {userInfo} = useSelector(state => state.auth)
const { id } = useParams()
const [formData, setFormData] = useState(null)
const {pending, questionCd, error} = useSelector(state => state.question)
const {treatment} = useSelector(state => state.treatment)
const {listDiagnose} = useSelector(state => state.diagnose)
    const [query, setQuery ] = useState("")
    const [name, setName] = useState(treatment.name || "")
    const [note, setNote] = useState(treatment.note ||"")
    const [desc, setDesc] = useState(treatment.desc || "")
    const [result, setResult] = useState( treatment.result || "")
    const [questionId, setQuestionId] = useState(treatment.questionId || "")
    const [diagnoseId, setDiagnoseId] = useState(treatment.diagnoseId || "")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const token = userInfo?.token
        dispatch(getACd(token))
        // dispatch(getAllQuestion())
        dispatch(getDiagByQuestion(query))
        dispatch(fetchOneTreatment(id))
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
    //   dispatch(createTreatment({treatment, token}))
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
        <h2 className="content-title">Thêm câu hỏi</h2>
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

export default EditTreatmentMain


        
        
        

