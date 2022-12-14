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
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteEmployeeId } from "../../services/employee";

const TableList = ({ data }) => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (!user) {
      Swal.fire("", "Nesecitas estar logueado!", "warning");
      navigate("/");
    } else {
      deleteEmployeeId(id, user.token).then(() => {
        Swal.fire("", "Listo", "success");
        navigate("/admin");
      });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Editar</TableCell>
            <TableCell align="left">Nombre(s)</TableCell>
            <TableCell align="left">Apellido(s)</TableCell>
            <TableCell>Eliminar</TableCell>
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
                <TableCell>
                  <IconButton onClick={() => handleDelete(id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
