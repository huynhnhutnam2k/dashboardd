/* eslint-disable default-case */
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import Toast from "../LoadingError/Toast";
import { reset } from "../../redux/questionSlice";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import {
  getDiagnosesByPreliminary,
} from "../../redux/diagnoseSlice";
import { createTreatment } from "../../redux/treatmentSlice";
import { getByRole } from "../../redux/authSlice";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { getPreliminariesBySituation } from "../../redux/preliminarySlice";

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
  const { diagnosesByPreliminary } = useSelector((state) => state.diagnose);
  const { addSuccess, error } = useSelector((state) => state.treatment);
  const { prebysituationid } = useSelector((state) => state.pre)
  const [queryPreliminary, setQueryPreliminary] = useState();
  const [queryDiagnose, setQueryDiagnose] = useState()
  const dispatch = useDispatch();
  const token = userInfo?.token;
  useEffect(() => {
    dispatch(getByRole(token));
    queryPreliminary && dispatch(getPreliminariesBySituation(queryPreliminary));
    queryDiagnose && dispatch(getDiagnosesByPreliminary(queryDiagnose))
    if (addSuccess) {
      toast.success("Them moi thanh cong", ToastObjects);
      dispatch(reset());
    }
    if (error) {
      toast.error("Them moi that bai", ToastObjects);
      dispatch(reset());
    }
  }, [dispatch, queryPreliminary, addSuccess, error, queryDiagnose, token]);
  const handleChangeDesc = (content) => {
    formik.setFieldValue("desc", content);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      desc: "",
      note: "",
      isTrue: false,
      situation: "",
      preliminary: "",
      diagnose: ""
    },
    validationSchema: yup.object({
      desc: yup.string().required("Vui lòng nhập mô tả"),
      name: yup.string().required("Vui lòng nhập tên cách điều trị"),
      situation: yup.string().required("Vui lòng chọn tình huống"),
      preliminary: yup.string().required("vui lòng chọn chẩn đoán sơ bộ"),
      diagnose: yup.string().required("Vui lòng chon chẩn đoán cuối cùng")
    }),
    onSubmit: (values, { resetForm }) => {
      const body = {
        name: values.name,
        desc: values.desc,
        note: values.note,
        isTrue: values.isTrue,
        situation: values.situation,
        diagnose: values.diagnose,
        preliminary: values.preliminary

      };
      const token = userInfo?.token;
      console.log(body);
      dispatch(createTreatment({ body, token })).then(resetForm());

      if (addSuccess) {
        toast.success("Thêm mới tình huống thành công!!!", ToastObjects);

      }
    },
  });

  const handleChangeSituation = (e) => {
    formik.setFieldValue("situation", e.target.value)
    setQueryPreliminary(e.target.value)
  }

  const handleChangePreliminary = (e) => {
    formik.setFieldValue("preliminary", e.target.value)
    setQueryDiagnose(e.target.value)
    console.log(e.target.value)
  }

  const handleChangeDiagnose = (e) => {
    formik.setFieldValue("diagnose", e.target.value)
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
        // eslint-disable-next-line default-case
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
                    {formik.errors.name && formik.touched.name && (
                      <p style={{ color: "red" }}>*{formik.errors.name}</p>)}
                  </div>


                  <h6 className="mt-4">Kết quả điều trị</h6>
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
                          <option value={item?._id} key={item._id}>{item?.name}</option>
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
                      onChange={handleChangePreliminary}
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
                    <select
                      className="form-control mt-3"
                      name="diagnose"
                      value={formik.values.diagnose}
                      onChange={handleChangeDiagnose}
                    >
                      <option value="">Chẩn đoán xác định</option>
                      {diagnosesByPreliminary?.length === undefined ? (
                        <>
                          <option value={diagnosesByPreliminary?._id}>
                            {diagnosesByPreliminary?.name}
                          </option>
                        </>
                      ) : (diagnosesByPreliminary?.map((item) => (
                        <option value={item?._id} key={item._id}>
                          {item?.name}
                        </option>
                      ))
                      )}
                    </select>
                    {formik.errors.diagnose && formik.touched.diagnose && (
                      <p style={{ color: "red" }}>*{formik.errors.diagnose}</p>)}
                  </div>
                  <h6>Mô tả</h6>
                  {formik.errors.desc && formik.touched.desc && (
                    <p style={{ color: "red" }}>*{formik.errors.desc}</p>)}
                  <SunEditor
                    className="mb-4 "
                    onChange={handleChangeDesc}
                    onImageUploadBefore={handleImageUploadBefore}
                    setContents={formik.values.desc}
                    setOptions={{ buttonList: buttonList.complex, height: 500 }}
                  />
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
