import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { useNavigate } from "react-router-dom";
import { addQuestion, reset } from "../../redux/questionSlice";
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
const AddQnAMain = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { listDepartment:departmentCd } = useSelector((state) => state.department);
  const { pending, addSuccess } = useSelector((state) => state.question);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo?.token) {
      const token = userInfo?.token;
      dispatch(getByRole(token));
    }
    if (addSuccess) {
      toast.success("Thêm mới thành công!!!", ToastObjects);
      dispatch(reset());
    }
  }, [dispatch, addSuccess]);
  const [desc, setDesc] = useState(null);
  const handleChangeDesc = (content) => {
    setDesc(content);
  };
  const formik = useFormik({
    initialValues: {
      desc: "",
      name: "",
      departmentId: "",
    },
    validationSchema: yup.object({
      // desc : yup.string().required(),
      name: yup.string().required("required"),
      departmentId: yup.string(),
    }),
    onSubmit: (values) => {
      const body = {
        name: values.name,
        desc: desc,
        departmentId: values.departmentId,
      };
      const token = userInfo?.token;
      dispatch(addQuestion({ body, token }));
      // console.log(body);
      if (addSuccess) {
        toast.success("Thêm mới tình huống thành công!!!", ToastObjects);
        // dispatch
      }
    },
  });

  ////

  const handleImageUploadBefore = (files, info, uploadHandler) => {
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };  
    const storageRef = ref(storage, 'images/' + files[0].name);
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
          disabled={!formik.dirty}
        >
          <div className="content-header">
            <Link to="/qnas" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm tình huống</h2>
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
                  <SunEditor
                    className="mb-4"
                    onChange={handleChangeDesc}
                    onImageUploadBefore={handleImageUploadBefore}
                    setOptions={{ buttonList: buttonList.complex, height: 500 }}
                  />
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
                    <select
                      className="form-control mt-3"
                      name="departmentId"
                      value={formik.values.departmentId}
                      onChange={formik.handleChange}
                    >
                      <option value="">Department</option>
                      
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

export default AddQnAMain;
