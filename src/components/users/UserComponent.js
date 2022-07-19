import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./../LoadingError/Loading";
// import { getAllUser } from "../../redux/authSlice";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUser, deleteUser } from "../../redux/authSlice";
import './user.css'
const UserComponent = () => {
  const { listUsers: users, userInfo, loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const token = userInfo?.token

  console.log(userInfo)
  useEffect(() => {
    // getAllUser(dispatch, user?.token)
    dispatch(getAllUser(token))
  }, [dispatch, token])
  // console.log(users, error)
  const delUser = async (e) => {
    const id = e.target.value
    await dispatch(deleteUser({ token, id }))
    window.location.reload();
  }
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Nhân viên</h2>
        <div>
          <Link to="/add-user" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Thêm mới
          </Link>
        </div>
      </div>

      <div className="card mb-4">

        {/* Card */}

        <div className="card-body">
          {loading ? <Loading /> :
            <>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                {/* List users */}
                {users?.map(item => (<>

                  <div className="col" key={item._id}>
                    <div className="card card-user shadow-sm">
                      <div className="card-header">
                        <button key={item._id} className="close" value={item._id} onClick={(e) => delUser(e)} />
                        <img
                          className="img-md img-avatar"
                          src="images/logo.gif"
                          alt="User pic"
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title mt-5">{item.username}</h5>
                        <div className="card-text text-muted">
                          <p className="m-0">Role: {item.role}</p>
                          {/* <p>
                              <a href={`mailto:`}>Email</a>
                            </p> */}
                        </div>
                      </div>
                    </div>
                  </div></>
                ))}
              </div>
            </>
          }



          {/* nav */}
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section >
  );
};

export default UserComponent;
