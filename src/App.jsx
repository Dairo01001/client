import React from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";
import EmployeeDetails from "./pages/EmployeeDetails";
import Team from "./pages/Team";
import Combos from "./pages/Combos";
import Venta from "./pages/Venta";
import Person from "./pages/Person";
import MotosEmployee from "./pages/MotosEmployee";
import DetalleVentas from "./pages/DetalleVentas";

const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/person/:id" element={<Person />} />
        <Route path="/team" element={<Team />} />
        <Route path="/combo" element={<Combos />} />
        <Route path="/venta/:id" element={<Venta />} />
        <Route path="/details" element={<DetalleVentas />} />
        <Route path="/motos" element={<MotosEmployee />} />
      </Routes>
    </Container>
  </ThemeProvider>
);

export default App;
