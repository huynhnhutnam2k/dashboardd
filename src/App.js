import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import QnAScreen from "./screens/QnAScreen";
import AddQnA from "./screens/AddQnA";
import AddUser from "./screens/AddUser";

import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import QnAEditScreen from "./screens/QnAEditScreen";
import DepartmentScreen from "./screens/DepartmentScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/qnas" element={<QnAScreen />} />
          <Route path="/add-qna" element={<AddQnA />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/department" element={<DepartmentScreen />} />
          <Route path="/users" element={<UsersScreen />} />
          <Route path="/qna/:id/edit" element={<QnAEditScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
