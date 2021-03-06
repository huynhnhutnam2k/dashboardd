import React, { useEffect, useState } from "react";
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
  decrementTreatment,
  deleteTreatment,
  fetchTreatment,
  incrementTreatment,
} from "../../redux/treatmentSlice";
import { reset } from "../../redux/questionSlice";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
};
const MainTreatment = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { listTreatment, pending, deleteSuccess, page, maxPage } =
    useSelector((state) => state.treatment);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [idTreatment, setIdTreatment] = useState("");
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Xoa thanh cong", ToastObjects);
      dispatch(reset());
    }
    dispatch(fetchTreatment());
  }, [dispatch, listTreatment?.length, deleteSuccess, page]);
  const handleChange = (e) => {
    navigate(`/treatment/${e.target.dataset.id}/edit`);
  };
  console.log(listTreatment)
  const handleConfirm = () => {
    const id = idTreatment;
    const token = userInfo?.token;
    dispatch(deleteTreatment({ id, token }));
    setOpen(false);
  };
  const handleDelete = (e) => {
    setOpen(true);
    setIdTreatment(e.target.dataset.id);
  };
  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Danh s??ch ??i???u tr???</h2>
          <div>
            <Link to="/add-treatment" className="btn btn-primary">
              Th??m m???i
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
                  <option>Th??? lo???i</option>
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
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" sx={{ maxWidth: 350 }}>
                          T??n ??i???u tr???
                        </TableCell>
                        <TableCell align="center">T??n t??nh hu???ng</TableCell>
                        <TableCell align="center">T??n ch???n ??o??n s?? b???</TableCell>
                        <TableCell align="center">T??n ch???n ??o??n cu???i c??ng</TableCell>
                        <TableCell align="center">
                          ??i???u tr??? th??nh c??ng
                        </TableCell>
                        <TableCell align="center">Created At</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listTreatment?.map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            align="center"
                            sx={{ maxWidth: 350 }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="center">
                            {row.situation?.name}
                          </TableCell>
                          <TableCell align="center">
                            {row.preliminary?.name}
                          </TableCell>
                          <TableCell align="center">
                            {row.diagnose?.name}
                          </TableCell>
                          {row.isTrue ? (
                            <TableCell align="center">Th??nh c??ng</TableCell>
                          ) : (
                            <TableCell align="center">Th???t bai</TableCell>
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
            <nav className="float-end mt-4" aria-label="Page navigation">
              <ul className="pagination">
                <li className={`page-item ${page === 1 ? "disabled" : ""} `}>
                  <Link
                    className="page-link"
                    to="#"
                    onClick={() => dispatch(decrementTreatment())}
                  >
                    Previous
                  </Link>
                </li>
                <li className="page-item active">
                  <Link className="page-link" to="#">
                    {page}
                  </Link>
                </li>
                <li
                  className={`page-item ${page >= maxPage ? "disabled" : ""} `}
                >
                  <Link
                    className="page-link"
                    to="#"
                    onClick={() => dispatch(incrementTreatment())}
                  >
                    Next
                  </Link>
                </li>
              </ul>
            </nav>
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
              B???n ch???c ch???n x??a ch??a?
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

export default MainTreatment;
