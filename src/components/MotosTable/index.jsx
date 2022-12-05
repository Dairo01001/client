import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteFactura, getMotosDia, setPagoMoto } from "../../services/moto";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../redux/reducers/motoSlice";
import SearchAppBar from "../SearchAppBar";

const MotosTable = () => {
  const auxFacturas = useSelector(state => state.motos.auxFacturas);
  const user = useSelector((state) => state.user.user);
  const dispach = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getMotosDia().then((res) => {
      if (res) {
        dispach(addData(res));
      }
    });
  }, []);

  const handleChangePago = (data) => {
    setPagoMoto(data)
      .then(() => {
        Swal.fire("", "Listo", "success");
        getMotosDia().then((res) => {
          dispach(addData(res));
        });
      })
      .catch(() => {
        Swal.fire(
          "Ups!",
          "Error al tratar de modificar esta factura",
          "warning"
        );
      });
  };

  const handleDeleteFactura = (id, token) => {
    if (!user) {
      Swal.fire("Ups!", "Debes estar logueado!", "warning");
      navigate("/");
    } else {
      if (user.role !== "ADMIN") {
        Swal.fire(
          "Error!",
          "Solo el Administrador tiene permitido eliminar Facturas!",
          "error"
        );
      } else {
        Swal.fire({
          title: "¿Seguro que deseas eliminar este cliente?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Eliminar",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            deleteFactura(id, token)
              .then(() => {
                getMotosDia().then((res) => {
                  dispach(addData(res));
                });
                Swal.fire("Eliminado!", "", "success");
              })
              .catch((err) => {
                Swal.fire("Ups!", err.response.data.msg, "error");
              });
          }
        });
      }
    }
  };

  return (
    <TableContainer component={Paper}>
     <SearchAppBar />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pago</TableCell>
            <TableCell align="left">Placa</TableCell>
            <TableCell align="right">Equipo</TableCell>
            <TableCell align="right">Ver Cliente</TableCell>
            <TableCell align="right">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {auxFacturas.map(({ id, isPaid, Motorcycle, Employees }) => (
            <TableRow key={id}>
              <TableCell>
                <IconButton
                  onClick={() =>
                    handleChangePago({ id, isPaid: isPaid ? false : true })
                  }
                >
                  {isPaid ? <DoneOutlineIcon /> : <NotInterestedIcon />}
                </IconButton>
              </TableCell>
              <TableCell align="left">{Motorcycle.plaque}</TableCell>
              <TableCell align="right">
                {Employees.length !== 0 ? (
                  <IconButton>
                    <DoneOutlineIcon />
                  </IconButton>
                ) : (
                  <IconButton component={Link} to={`/venta/${id}`}>
                    <AssignmentIndIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => navigate(`/person/${Motorcycle.PersonId}`)}
                >
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => handleDeleteFactura(id, user?.token)}
                >
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

export default MotosTable;
