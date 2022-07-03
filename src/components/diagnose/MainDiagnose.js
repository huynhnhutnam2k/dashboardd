import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import momment from 'moment'
import Loading from "../LoadingError/Loading";
import { allDepartment, departFetch } from "../../redux/departmentSlice";
import { delDiagnose, getAllDiag } from "../../redux/diagnoseSlice";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MainDiagnose = () => {
    const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {userInfo} = useSelector(state => state.auth)
  const { pending, listDiagnose, deleteSuccess } = useSelector(state => state.diagnose)
  const [idDiagnose, setIdDiagnose] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllDiag())
  },[dispatch,deleteSuccess, listDiagnose?.length])
  const handleChange = (e) => {
    navigate(`/diagnose/${e.target.dataset.id}/edit`)
  }
  const handleConfirm = () => {
    const id = idDiagnose
    const token = userInfo?.token
    dispatch(delDiagnose({id, token}))
    setOpen(!open)
  }
  const handleDelete = (e) => {
    setOpen(true)
    setIdDiagnose(e.target.dataset.id)
  }
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Danh sách chẩn đoán</h2>
          <div>
            <Link to="/add-diagnose" className="btn btn-primary">
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
            {pending ? <Loading /> : <>

                <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Tên tình huống</TableCell>
                    <TableCell align="center">Số cách điều trị</TableCell>
                    <TableCell align="center">Đúng?</TableCell>
                    <TableCell align="center">Created At</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listDiagnose?.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.situationId?.name}</TableCell>
                      <TableCell align="center">{row.treatment?.length}</TableCell>
                      {row.isTrue ? <TableCell align="center">Đúng</TableCell> : <TableCell align="center">Sai</TableCell>}
                      <TableCell align="center"> {momment(row.createdAt).format("MMM Do YY")}</TableCell>
                      <TableCell align="center" sx={{ alignItems: 'center', display: "flex",  height: "200px", cursor: "pointer", gap: "0 15px"}}>
                        <div onClick={handleChange} data-id={row._id} className="button-parent"><ion-icon name="hammer-outline"></ion-icon></div>
                        <div onClick={handleDelete} data-id={row._id} className="button-parent"><ion-icon name="close-outline"></ion-icon></div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </>}
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
            <Stack spacing={4} direction="row" sx={{marginTop: '20px'}}>
              {/* <Button variant="text">Text</Button> */}
              <Button variant="contained" sx={{padding: "10px 20px", minWidth: '150px'}} onClick={handleConfirm}>Confirm</Button>
              <Button variant="outlined" sx={{padding: "10px 20px", minWidth: '150px'}} onClick={handleClose}>Cancel</Button>
            </Stack>
          </Box>
        </Modal>
      </section>
    </>
    
  )
}

export default MainDiagnose