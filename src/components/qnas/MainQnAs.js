import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import momment from "moment";
import Loading from "../LoadingError/Loading";
import {
  deleteQuestion,
  getAllQuestion,
  reset,
} from "../../redux/questionSlice";
import { getByRole } from "../../redux/authSlice";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  fontFamily: "Josefin Sans",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
  fontFamily: `'Josefin Sans', sans-serif`,
};
const MainQnAs = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { listQuestion, pending, error, deleteSuccess } = useSelector(
    (state) => state.question
  );
  const { situation } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [idQuestion, setIdQuestion] = useState("");
  useEffect(() => {
    dispatch(getAllQuestion());
    dispatch(getByRole(userInfo?.token));
    if (deleteSuccess) {
      toast.success("Xóa tình huống thành công", ToastObjects);
      dispatch(reset());
    }
  }, [dispatch, listQuestion.length, deleteSuccess]);
  const handleChange = (e) => {
    navigate(`/qna/${e.target.dataset.id}/edit`);
  };
  const handleConfirm = () => {
    const id = idQuestion;
    const token = userInfo?.token;
    dispatch(deleteQuestion({ id, token }));
    setOpen(false);
  };
  const handleDelete = (e) => {
    setOpen(true);
    setIdQuestion(e.target.dataset.id);
  };
  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Danh sách tình huống</h2>
          <div>
            <Link to="/add-qna" className="btn btn-primary">
              Thêm mới
            </Link>
          </div>
        </div>

        <div className="card mb-4 shadow-sm">
          <header className="card-header bg-white ">
            <div className="row gx-3 py-3">
              <div className="col-lg-4 col-md-6 me-auto ">
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control p-2"
                />
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>Thể loại</option>
                  <option>Electronics</option>
                  <option>Clothings</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>Latest added</option>
                  <option>Cheap first</option>
                  <option>Most viewed</option>
                </select>
              </div>
            </div>
          </header>

          <div className="card-body">
            {pending ? (
              <Loading />
            ) : (
              <>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650, fontFamily: "Josefin Sans" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Tên</TableCell>
                        <TableCell align="center">Hoàn thành</TableCell>
                        <TableCell align="center">Created At</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listQuestion?.map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {row.name}
                          </TableCell>
                          {row.isFinish ? (
                            <TableCell align="center">Đúng</TableCell>
                          ) : (
                            <TableCell align="center">Sai</TableCell>
                          )}
                          <TableCell align="center">
                            {" "}
                            {momment(row.createdAt).format("MMM Do YY")}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              alignItems: "center",
                              display: "flex",
                              height: "200px",
                              cursor: "pointer",
                              gap: "0 15px",
                            }}
                          >
                            <div
                              onClick={handleChange}
                              data-id={row._id}
                              className="button-parent"
                            >
                              <ion-icon name="hammer-outline"></ion-icon>
                            </div>
                            <div
                              onClick={handleDelete}
                              data-id={row._id}
                              className="button-parent"
                            >
                              <ion-icon name="close-outline"></ion-icon>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Bạn chắc chắn xóa chưa?
            </Typography>
            <Stack spacing={4} direction="row" sx={{ marginTop: "20px" }}>
              {/* <Button variant="text">Text</Button> */}
              <Button
                variant="contained"
                sx={{ padding: "10px 20px", minWidth: "150px" }}
                onClick={handleConfirm}
              >
                Confirm
              </Button>
              <Button
                variant="outlined"
                sx={{ padding: "10px 20px", minWidth: "150px" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Modal>
      </section>
    </>
  );
};

export default MainQnAs;
