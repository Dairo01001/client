import React from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";

const TableList = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Editar</TableCell>
            <TableCell align="left">Nombre(s)</TableCell>
            <TableCell align="left">Apellido(s)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, names, surnames }) => {
            return (
              <TableRow key={id}>
                <TableCell>
                  <IconButton component={Link} to={`/employee/${id}`}>
                    <ModeEditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="left">{names}</TableCell>
                <TableCell align="left">{surnames}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
