import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
// import MainDiagnose from "../components/diagnose/MainDiagnose";
import MainPre from "../components/pre/MainPre";

const PreScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainPre />
      </main>
    </>
  );
};

export default PreScreen;
