import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
// import MainDepartment from "../components/department/MainDepartment";
import MainTreatment from "../components/treatment/MainTreatment";

const TreatmentScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainTreatment />
      </main>
    </>
  );
};

export default TreatmentScreen;
