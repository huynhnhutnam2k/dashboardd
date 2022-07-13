/* eslint-disable default-case */
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import Toast from "../LoadingError/Toast";
import { addQuestion, reset } from "../../redux/questionSlice";
import { getByRole } from "../../redux/authSlice";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { departFetch } from "../../redux/departmentSlice"

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const AddQnAMain = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { listDepartment: departmentCd } = useSelector((state) => state.department);
  const { addSuccess } = useSelector((state) => state.question);

  const token = userInfo?.token;
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getByRole(token));
      dispatch(departFetch())
    }
    if (addSuccess) {
      toast.success("Thêm mới thành công!!!", ToastObjects);
      dispatch(reset());
    }
  }, [dispatch, addSuccess, token]);
  const handleChangeDesc = (content) => {
    formik.setFieldValue("desc", content)
  };
  const formik = useFormik({
    initialValues: {
      desc: "",
      name: "",
      departmentId: "",
    },
    validationSchema: yup.object({
      // desc : yup.string().required(),
      name: yup.string().required("Vui lòng nhâp tên tình huống"),
      departmentId: yup.string().required("Vui Lòng chọn chuyên khoa"),
      desc: yup.string().required("Vui lòng nhập chi tiết")
    }),
    onSubmit: (values) => {
      const body = {
        name: values.name,
        desc: values.desc,
        departmentId: values.departmentId,
      };
      dispatch(addQuestion({ body, token }));
      if (addSuccess) {
        toast.success("Thêm mới tình huống thành công!!!", ToastObjects);

      }
    },
  });

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
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
          disabled={!formik.dirty}
        >
          <div className="content-header">
            <Link to="/qnas" className="btn btn-danger">
              Trở về
            </Link>
            <h2 className="content-title">Thêm tình huống</h2>

            <div>
              <Link to="/add-pre" className="btn btn-next right">
                Bước tiếp theo
              </Link>
              <div>
                <button className="btn btn-primary" type="submit">
                  Thêm tình huống
                </button></div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <label className="form-label">Tên tình huống</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    ></input>
                    {formik.errors.name && formik.touched.name && (
                      <p style={{ color: "red" }}>*{formik.errors.name}</p>)}
                  </div>
                  <div className="mb-4">
                    <select
                      className="form-control mt-3"
                      name="departmentId"
                      value={formik.values.departmentId}
                      onChange={formik.handleChange}
                    >
                      <option value="">Chuyên khoa</option>

                      {departmentCd?.length === undefined ? (
                        <option
                          key={departmentCd?._id}
                          value={departmentCd?._id}
                        >
                          {departmentCd?.name}
                        </option>
                      ) : (
                        departmentCd?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))
                      )}
                    </select>
                    {formik.errors.departmentId && formik.touched.departmentId && (
                      <p style={{ color: "red" }}>*{formik.errors.departmentId}</p>)}
                  </div>
                  Chi tiết
                  {formik.errors.desc && formik.touched.desc && (
                    <p style={{ color: "red" }}>*{formik.errors.desc}</p>)}
                  <SunEditor
                    className="mb-4"
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

export default AddQnAMain;
