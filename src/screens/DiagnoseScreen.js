import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
// import MainDepartment from "../components/department/MainDepartment";
import MainDepartment from "../components/deparment/MainDepartment";
import MainDiagnose from "../components/diagnose/MainDiagnose";

const DiagnoseScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainDiagnose />
      </main>
    </>
  );
};

export default DiagnoseScreen;
