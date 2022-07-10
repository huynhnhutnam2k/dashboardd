import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MarksManagementF from "../components/marksmanagement/MarksManagementF";

const MarksManagement = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MarksManagementF/>        
      </main>
    </>
  );
};

export default MarksManagement;
