import React from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";
import EmployeeDetails from "./pages/EmployeeDetails";
import Team from "./pages/Team";
import Combos from "./pages/Combos";
import Venta from "./pages/Venta";
import Person from "./pages/Person";
import MotosEmployee from "./pages/MotosEmployee";
import Product from "./pages/Product";
import CajaMenor from "./pages/CajaMenor";
import Sales from "./pages/Sales";
import Edit from "./pages/Edit";
import ReportData from "./pages/ReportData";
import { useSelector } from "react-redux";

const theme = createTheme();

const App = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          {user && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/employee/:id" element={<EmployeeDetails />} />
              <Route path="/person/:id" element={<Person />} />
              <Route path="/team" element={<Team />} />
              <Route path="/combo" element={<Combos />} />
              <Route path="/venta/:id" element={<Venta />} />
              <Route path="/details" element={<Sales />} />
              <Route path="/product" element={<Product />} />
              <Route path="/motos" element={<MotosEmployee />} />
              <Route path="/retiro" element={<CajaMenor />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/report" element={<ReportData />} />
            </>
          )}
          <Route path="*" element={<Navigate to={"/"}></Navigate>} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
