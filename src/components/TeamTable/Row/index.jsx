import React, { useState } from "react";
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import {
  eliminarEquipo,
  getOperatorsTeam,
  getTeams,
} from "../../../services/team";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addOperatorsTeam, addTeams } from "../../../redux/reducers/teamSlice";

const Row = ({ id, name, Employees }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const deleteTeam = (id) => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar este equipo?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarEquipo(id).then(() => {
          Swal.fire("Eliminado", "", "success");
          getTeams().then((data) => {
            dispatch(addTeams(data));
          });
          getOperatorsTeam().then((data) => {
            dispatch(addOperatorsTeam(data));
          });
        });
      }
    });
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderButton: "unset" } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell>
          <IconButton onClick={() => deleteTeam(id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Conformado por
              </Typography>
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre(s)</TableCell>
                  <TableCell>Apellido(s)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Employees.map(({ id, names, surnames }) => {
                  return (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">
                        {names}
                      </TableCell>
                      <TableCell>{surnames}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
