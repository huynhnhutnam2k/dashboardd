import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddDepartmentMain from "../components/deparment/AddDepartmentMain";

const AddDpm = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddDepartmentMain />
      </main>
    </>
  )
}

export default AddDpm