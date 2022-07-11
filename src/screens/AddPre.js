import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";

// import AddDiagnoseMain from "../components/diagnose/AddDiagnoseMain";
import AddPreMain from "../components/pre/AddPreMain";

const AddPre = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddPreMain />
      </main>
    </>
  );
};

export default AddPre;
