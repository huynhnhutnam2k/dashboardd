import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddDiagnoseMain from "../components/diagnose/AddDiagnoseMain";

const AddDiagnose = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddDiagnoseMain />
      </main>
    </>
  );
};

export default AddDiagnose;
