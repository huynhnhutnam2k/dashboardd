import React, { useLayoutEffect, useState } from "react";
import Toast from "../LoadingError/Toast";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../LoadingError/Loading";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getPre, updatePre } from "../../redux/preliminarySlice";
import SunEditor, { buttonList } from "suneditor-react";
import { getByRole } from "../../redux/authSlice";
import { getAllQuestion, reset } from "../../redux/questionSlice";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHouver: false,
    autoClose: 2000,
};
const EditPreMain = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { userInfo } = useSelector((state) => state.auth);
    const { listQuestion } = useSelector((state) => state.question);
    const { pre, pending, updateSuccess, error } = useSelector(
        (state) => state.pre
    );
    useLayoutEffect(() => {
        dispatch(getPre(id));
        const token = userInfo?.token;
        dispatch(getByRole(token));
        dispatch(getAllQuestion());
        // !editDesc && setDesc(pre?.desc);
        if (updateSuccess) {
            toast.success("Cập nhật thành công", ToastObjects);
            dispatch(reset());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, updateSuccess, error]);
    const [desc, setDesc] = useState(pre?.desc);
    const formik = useFormik({
        initialValues: {
            name: pre?.name,
            desc: pre?.desc,
            isTrue: pre?.isTrue,
            situationId: pre?.situationId?._id,
        },
        validationSchema: yup.object({}),
        enableReinitialize: true,
        onSubmit: (values) => {
            let body;

            if (editDesc === false) {
                body = {
                    name: values.name,
                    desc: values.desc,
                    isTrue: values.isTrue,
                    situationId: values.situationId,
                };
            } else {
                body = {
                    name: values.name,
                    isTrue: values.isTrue,
                    desc: desc,
                    situationId: values.situationId,
                };
            }

            const token = userInfo?.token;
            console.log(id);
            dispatch(updatePre({ id, body, token }));
            //
        },
    });
    const [editDesc, setEditDesc] = useState(false);
    const handleChangeDesc = (content) => {
        setDesc(content);
    };
    const handleImageUploadBefore = (files, info, uploadHandler) => {
        /** @type {any} */
        const metadata = {
            contentType: "image/jpeg",
        };
        const storageRef = ref(storage, "images/" + new Date());
        const uploadTask = uploadBytesResumable(storageRef, files[0], metadata);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                // eslint-disable-next-line default-case
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                // eslint-disable-next-line default-case
                switch (error.code) {
                    case "storage/unauthorized":
                        break;

                    case "storage/unknown":
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
                    };
                    uploadHandler(response);
                });
            }
        );
    };

    return (
        <>
            <Toast />
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form onSubmit={formik.handleSubmit} enableReinitialize={true}>
                    <div className="content-header">
                        <Link to="/preliminary" className="btn btn-danger text-white">
                            Go to products
                        </Link>
                        <h2 className="content-title">Cập nhật chẩn đoán sơ bộ</h2>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Cập nhật
                            </button>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    {pending ? (
                                        <Loading />
                                    ) : (
                                        <>
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
                                                <label className="form-label">Mô tả</label>
                                                <div
                                                    className="form-control"
                                                    dangerouslySetInnerHTML={{
                                                        __html: `${formik.values.desc}`,
                                                    }}
                                                />
                                            </div>
                                            <h6>Bạn có muốn sửa mô tả không?</h6>
                                            <div className="button-group">
                                                <div
                                                    className={`button-check ${editDesc === false ? "isCheck" : ""
                                                        }`}
                                                    onClick={() => setEditDesc(false)}
                                                >
                                                    Không
                                                </div>
                                                <div
                                                    className={`button-check ${editDesc ? "isCheck" : ""
                                                        }`}
                                                    onClick={() => setEditDesc(true)}
                                                >
                                                    Có
                                                </div>
                                            </div>
                                            {editDesc && (
                                                <SunEditor
                                                    className="mb-4"
                                                    // defaultValue={formik.values.desc}
                                                    // defaultValue="<p>The editor's default value</p>"
                                                    onImageUploadBefore={handleImageUploadBefore}
                                                    onChange={handleChangeDesc}
                                                    setOptions={{
                                                        buttonList: buttonList.complex,
                                                        height: 500,
                                                        value: formik.values.desc,
                                                        font: ["Josefin Sans"],
                                                    }}
                                                />
                                            )}
                                            <h6 className="mt-4">Kết quả chẩn đoán</h6>
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
                                                <select
                                                    className="form-control mt-3"
                                                    name="situationId"
                                                    value={formik.values.situationId}
                                                    onChange={formik.handleChange}
                                                >
                                                    {listQuestion?.map((item) => (
                                                        <option value={item._id}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditPreMain;
