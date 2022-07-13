/* eslint-disable default-case */
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { getAllQuestion, reset } from "../../redux/questionSlice";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import {
  getDiagnosesByPreliminary,
} from "../../redux/diagnoseSlice";
import { updateTreatment, fetchOneTreatment } from "../../redux/treatmentSlice";
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
const EditTreatmentMain = () => {
  const { userInfo } = useSelector(
    (state) => state.auth
  );
  const { id } = useParams();
  const { listQuestion } = useSelector((state) => state.question)
  const { diagnosesByPreliminary } = useSelector((state) => state.diagnose);
  const { pending, updateSuccess, error, treatment } = useSelector((state) => state.treatment);
  const { prebysituationid } = useSelector((state) => state.pre)
  const [queryPreliminary, setQueryPreliminary] = useState("");
  const [queryDiagnose, setQueryDiagnose] = useState("")
  //const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = userInfo?.token;
  useEffect(() => {
    const apiCall = async () => {
      await dispatch(fetchOneTreatment(id))
      await dispatch(getAllQuestion())
    }
    apiCall()
  }, [token, id, dispatch])
  useEffect(() => {
    const apiCall = async () => {
      await dispatch(getPreliminariesBySituation(treatment?.situation?._id))
      await dispatch(getDiagnosesByPreliminary(treatment?.preliminary?._id));
    }
    treatment?.situation?._id && apiCall()
  }, [dispatch, treatment])




  useEffect(() => {
    if (updateSuccess) {
      toast.success("Cập nhật thành công", ToastObjects);
      dispatch(reset());
    }
    if (error) {
      toast.error("Cập nhật thất bại", ToastObjects);
      dispatch(reset());
    }
  }, [dispatch, queryPreliminary, updateSuccess, error, queryDiagnose, id, token]);










  const [desc, setDesc] = useState(null);
  const handleChangeDesc = (content) => {
    setDesc(content);
  };

  const formik = useFormik({
    initialValues: {
      name: treatment?.name || "",
      desc: treatment?.desc || "",
      note: treatment?.note || "",
      isTrue: treatment?.isTrue || false,
      situation: treatment?.situation?._id || "",
      preliminary: treatment?.preliminary?._id || "",
      diagnose: treatment?.diagnose?._id || ""
    },
    validationSchema: yup.object({
      // desc : yup.string().required(),
      name: yup.string().required("required"),
    }), enableReinitialize: true,
    onSubmit: (values) => {
      const body = {
        name: values.name,
        desc: desc,
        note: values.note,
        isTrue: values.isTrue,
        situation: values.situation,
        diagnose: values.diagnose,
        preliminary: values.preliminary

      };
      const token = userInfo?.token;
      console.log("body", body);
      dispatch(updateTreatment({ id, body, token }));
      if (updateSuccess) {
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
      {console.log("formik", formik.values.isTrue)}
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
            <h2 className="content-title">Sửa cách điều trị</h2>
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
                  {pending ? (<Loading />) :
                    (<><div className="mb-4">
                      <label className="form-label">Tên</label>
                      <textarea
                        placeholder="Nhập vào đây..."
                        className="form-control"
                        // rows="4"
                        name="name"
                        value={formik?.values?.name}
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
                        setContents={formik?.values?.desc}
                        setOptions={{ buttonList: buttonList.complex, height: 500 }}
                      />
                      <h6 className="mt-4">Kết quả điều trị</h6>
                      <div className="mb-4  button-group">
                        <div
                          className={`button-check ${formik.values.isTrue ? "isCheck" : ""
                            }`}
                          onClick={() => formik.setFieldValue("isTrue", true)}
                        >
                          {" "}
                          Thành công
                        </div>
                        <div
                          className={`button-check ${formik.values.isTrue === false ? "isCheck" : ""
                            }`}
                          onClick={() => formik.setFieldValue("isTrue", false)}
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
                          value={formik?.values?.note}
                          // required
                          onChange={formik.handleChange}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <select
                          id="situationSelect"
                          className="form-control mt-3"
                          name="situation"
                          value={formik?.values?.situation}
                          onChange={handleChangeSituation}
                        >
                          <option value="">Tình huống</option>
                          {listQuestion?.length === undefined ? (
                            <>
                              <option value={listQuestion?._id}>
                                {listQuestion?.name}
                              </option>
                            </>
                          ) : (
                            listQuestion?.map((item) => (
                              <option value={item?._id} key={item?._id}>{item?.name}</option>
                            ))
                          )}
                        </select>
                      </div>
                      <div className="mb-4">
                        <select
                          className="form-control mt-3"
                          name="diagnose"
                          value={formik?.values?.preliminary}
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
                      </div>
                      <div className="mb-4">
                        <select
                          className="form-control mt-3"
                          name="diagnose"
                          value={formik?.values?.diagnose}
                          onChange={handleChangeDiagnose}
                        >
                          <option value="">Chẩn đoán lâm sàng</option>
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
                      </div></>)}
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
