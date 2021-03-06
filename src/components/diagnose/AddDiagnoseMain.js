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
      name: yup.string().required("Vui l??ng nh???p t??n t??nh hu???ng"),
      situation: yup.string().required("Vui l??ng ch???n t??nh hu???ng"),
      preliminary: yup.string().required("Vui l??ng ch???n ch???n ??o??n s?? b???")
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
          toast.success("Th??m m???i th??nh c??ng!!!", ToastObjects);
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
              Tr??? v???
            </Link>
            <h2 className="content-title">Th??m ch???n ??o??n x??c ?????nh</h2>
            <div>
              <Link to="/add-treatment" className="btn btn-next right">
                B?????c ti???p theo
              </Link>
              <div>
                <button className="btn btn-primary" type="submit">
                  Th??m ch???n ??o??n
                </button></div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <label className="form-label">T??n</label>
                    <input
                      placeholder="Nh???p v??o ????y..."
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
                      <option value="">T??nh hu???ng</option>
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
                      <option value="">Ch???n ??o??n s?? b???</option>
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
                    <label className="form-label">????ng</label>
                    <input
                      placeholder="Nh???p v??o ????y..."
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
