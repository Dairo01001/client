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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCombos } from "../../redux/reducers/comboSlice";
import { deleteCombo, getCombos } from "../../services/combo";
import Loading from "../Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const CombosTable = () => {
  const combos = useSelector((state) => state.combo.combos);
  const dispath = useDispatch();

  useEffect(() => {
    if (!combos) {
      getCombos().then((data) => {
        dispath(addCombos(data));
      });
    }
  }, []);

  if (!combos) {
    return <Loading />;
  }

  const eliminarCombo = (id) => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar este combo?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCombo(id).then(() => {
          Swal.fire("Eliminado", "", "success");
          getCombos().then((data) => {
            dispath(addCombos(data));
          });
        });
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Nombre Combo</TableCell>
            <TableCell align="left">Precio $</TableCell>
            <TableCell>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {combos.map(({ id, title, price }) => (
            <TableRow key={id}>
              <TableCell align="left">{title}</TableCell>
              <TableCell align="left">{price}</TableCell>
              <TableCell>
                <IconButton onClick={() => eliminarCombo(id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CombosTable;
