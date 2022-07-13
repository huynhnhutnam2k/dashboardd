import React from "react";
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
import AddDpm from "./screens/AddDpm";
import AddDiagnose from "./screens/AddDiagnose";
import DepartEditScreen from "./screens/DepartEditScreen";
import DiagnoseScreen from "./screens/DiagnoseScreen";
import TreatmentScreen from "./screens/TreatmentScreen";
import AddTreatment from "./screens/AddTreatment";
import TreatmentEditScreen from "./screens/TreatmentEditScreen";
import DiagnoseEditScreen from "./screens/DiagnoseEditScreen";
import MarksManagement from "./screens/MarksManagement";
import PreScreen from "./screens/Pre";
import AddPre from "./screens/AddPre";
import PreEditScreen from "./screens/PreEditScreen";

// import TypographyOptions from "@mui/material/styles/createTypography"
// import { TypographyOptions } from '@mui/material/styles/createTypography';
// import { createThemem, typography } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material";
export const THEME = createTheme({
  typography: {
    "fontFamily": `'Josefin Sans', sans-serif`,
    //  "fontSize": 14,
    //  "fontWeightLight": 300,
    //  "fontWeightRegular": 400,
    //  "fontWeightMedium": 500
  }
});
function App() {
  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/qnas" element={<QnAScreen />} />
          <Route path="/qna/:id/edit" element={<QnAEditScreen />} />
          <Route path="/add-qna" element={<AddQnA />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/department" element={<DepartmentScreen />} />
          <Route path="/add-dpm" element={<AddDpm />} />
          <Route path="/dpm/:id/edit" element={<DepartEditScreen />} />
          <Route path="/diagnose" element={<DiagnoseScreen />} />
          <Route path="/add-diagnose" element={<AddDiagnose />} />
          <Route path="/diagnose/:id/edit" element={<DiagnoseEditScreen />} />
          <Route path="/treatment" element={<TreatmentScreen />} />
          <Route path="/add-treatment" element={<AddTreatment />} />
          <Route path="/treatment/:id/edit" element={<TreatmentEditScreen />} />
          <Route path="/users" element={<UsersScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/marksmanagement" element={<MarksManagement />} />
          <Route path="/preliminary" element={<PreScreen />} />
          <Route path="/preliminary/:id/edit" element={<PreEditScreen />} />
          <Route path="/add-pre" element={<AddPre />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
