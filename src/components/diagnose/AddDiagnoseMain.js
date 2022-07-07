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
import { addDiagnose } from "../../redux/diagnoseSlice";
import { getByRole } from "../../redux/authSlice";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const AddDiagnoseMain = () => {
  const { userInfo, situation } = useSelector((state) => state.auth);
  const { addSuccess, error } = useSelector((state) => state.diagnose);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getByRole(userInfo?.token));
    if (addSuccess) {
      toast.success("Them thannh cong", ToastObjects);
      dispatch(reset());
    }
    if (error) {
      toast.error("Them that bai", ToastObjects);
      dispatch(reset());
    }
  }, [dispatch, addSuccess, error]);
  const [file, setFile] = useState("");
  const [isTrue, setIsTrue] = useState(false);

  const [desc, setDesc] = useState(null);
  const handleChangeDesc = (content) => {
    setDesc(content);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      desc: "",
      situationId: "",
      isTrue: isTrue,
    },

    onSubmit: (values) => {
      const body = {
        name: values.name,
        desc: desc,
        situationId: values.situationId,
        isTrue: isTrue,
      };
      // console.log(body)
      if (userInfo.token) {
        const token = userInfo.token;
        console.log(body);
        dispatch(addDiagnose({ body, token }));
        if (addSuccess) {
          toast.success("Thêm mới thành công!!!", ToastObjects);
          // dispatch
        }
      }
    },
    // disabled: !formik.dirty,
  });
  
  ///
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
        >
          <div className="content-header">
            <Link to="/department" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm chẩn đoán</h2>
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
                  </div>
                  <SunEditor
                    className="mb-4"
                    onChange={handleChangeDesc}
                    onImageUploadBefore={handleImageUploadBefore}
                    setOptions={{ buttonList: buttonList.complex, height: 500 }}
                  />
                  <div className="mb-4">
                    <select
                      className="form-control mt-3"
                      name="situationId"
                      value={formik.values.situationId}
                      onChange={formik.handleChange}
                    >
                      <option value="">situation</option>
                      {situation?.length == undefined ? (
                        <>
                          <option value={situation?._id}>
                            {situation?.name}
                          </option>
                        </>
                      ) : (
                        situation?.map((item) => (
                          <option value={item?._id}>{item?.name}</option>
                        ))
                      )}
                    </select>
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
