import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getFacturacionEmpleados } from "../../services/sale";

export default function EmployeeWashing() {
  const [empleados, setEmpleados] = useState({});

  useEffect(() => {
    getFacturacionEmpleados().then((data) => {
      setEmpleados(data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre(s)</TableCell>
            <TableCell>Apellido(s)</TableCell>
            <TableCell>Comision</TableCell>
            <TableCell>Ganancias(Dia)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(empleados).map((key) => (
            <TableRow key={key}>
              <TableCell>{empleados[key].names}</TableCell>
              <TableCell>{empleados[key].surnames}</TableCell>
              <TableCell>{empleados[key].commission}</TableCell>
              <TableCell>{`${empleados[key].total} $`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
