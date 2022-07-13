import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.auth)
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/logo.gif"
              style={{ height: "46" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/"
                exact="true"
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Trang chủ</span>
              </NavLink>
            </li>
            {userInfo?.isAdmin && <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Nhân viên</span>
              </NavLink>
            </li>}
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/department"
              >
                <i className="icon fad fa-folder-tree"></i>
                <span className="text">Chuyên khoa</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/qnas"
              >
                {/* <i className="icon fas fa-shopping-bag"></i> */}
                <i className="icon fal fa-question"></i>
                <span className="text">Danh sách câu hỏi</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/preliminary"
              >
                <i className="icon fal fa-stethoscope"></i>
                <span className="text">Chuẩn Đoán Sơ Bộ</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/diagnose"
              >
                {/* <i className="icon fas fa-user"></i> */}
                {/* <i className="icon fa-solid fa-stethoscope"></i>
                 */}
                {/* <i className="fa-solid fa-stethoscope"></i> */}
                <i className="icon fal fa-stethoscope"></i>
                <span className="text">Chẩn đoán xác định</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/treatment"
              >
                <i className="icon far fa-user-md-chat"></i>
                <span className="text">Điều trị</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/add-user"
              >
                <i className="icon fas fa-plus "></i>
                <span className="text">Thêm nhân viên</span>
              </NavLink>
            </li> */}
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/marksmanagement"
              >
                <i className="icon far fa-user-md-chat"></i>
                <span className="text">Điểm Sinh Viên</span>
              </NavLink>
            </li>
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
