import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddTreatmentMain from "../components/treatment/AddTreatmentMain";

const AddTreatment = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddTreatmentMain />
      </main>
    </>
  );
};

export default AddTreatment;
