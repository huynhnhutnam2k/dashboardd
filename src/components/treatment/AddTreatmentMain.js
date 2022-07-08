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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import {
  getDiagByQuestion,
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
  const [query, setQuery] = useState(" ")
  // const [desc, setDesc] = useState("")
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
  }, [dispatch, query, addSuccess, error]);
  const [desc, setDesc] = useState(null);
  const handleChangeDesc = (content) => {
    setDesc(content);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      desc: "",
      note: "",
      isTrue: false,
      situation: "",
      diagnose: ""
    },
    validationSchema: yup.object({
      // desc : yup.string().required(),
      name: yup.string().required("required"),
    }),
    onSubmit: (values) => {
      const treatment = {
      name: values.name,
      desc: desc,
      note: values.note,
      isTrue: values.isTrue,
      situation: values.situation,
      diagnose: values.diagnose,
      };
      const token = userInfo?.token;
      console.log(treatment);
      dispatch(createTreatment({ treatment, token }));
      if (addSuccess) {
        toast.success("Thêm mới tình huống thành công!!!", ToastObjects);
      
      }
    },
  });

const handleChangeSituation = (e)=>{
  formik.setFieldValue("situation", e.target.value)
  setQuery(e.target.value)
}


  


////
const handleImageUploadBefore = (files, info, uploadHandler) => {
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg'
  };  
  const storageRef = ref(storage, 'images/' + new Date());
  const uploadTask = uploadBytesResumable(storageRef, files[0], metadata);  
  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
          break;
        case 'storage/unknown':
          break;
      }
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {        
              const response = {
                result: [
                  {
                    url: downloadURL,
                    name: files[0].name,
                    size: files[0].size,
                  },
                ],
              }
              uploadHandler(response)        
      });
    }
  );  
}


  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form
          onSubmit={formik.handleSubmit}
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
                      value={formik.values.name}
                      style={{ width: "100%" }}
                      // required
                      onChange={formik.handleChange}
                    ></textarea>
                  </div>

                  <h6>Mô tả</h6>
                  <SunEditor
                    className="mb-4 "
                    onChange={handleChangeDesc}
                    onImageUploadBefore={handleImageUploadBefore}
                    setOptions={{ buttonList: buttonList.complex, height: 500 }}
                  />
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
                            formik.values.isTrue === false ? "isCheck" : ""
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
                      // required
                      onChange={formik.handleChange}
                    ></input>
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
                  </div>
                  <div className="mb-4">
                    <select
                      className="form-control mt-3"
                      name="diagnose"
                      value={formik.values.diagnose}
                      onChange={formik.handleChange}
                    >
                      <option value="">Chẩn đoán</option>
                      {listDiagnose?.diagnose?.length === undefined ? (
                        <>
                          <option value={listDiagnose?._id}>
                            {listDiagnose?.name}
                          </option>
                        </>
                      ) : (
                        listDiagnose.diagnose?.map((item) => (
                          
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
