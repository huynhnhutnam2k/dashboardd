import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
// import MainDepartment from "../components/department/MainDepartment";
import MainDepartment from "../components/deparment/MainDepartment";

const DepartmentScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainDepartment />
      </main>
    </>
  );
};

export default DepartmentScreen;
