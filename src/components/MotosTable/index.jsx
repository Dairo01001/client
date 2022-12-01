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
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteFactura, getMotosDia, setPagoMoto } from "../../services/moto";
import Loading from "../Loading";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const MotosTable = () => {
  const [data, setData] = useState(null);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    getMotosDia().then((res) => {
      setData(res);
    });
  }, []);

  if (!data) {
    return <Loading />;
  }

  const handleChangePago = (data) => {
    setPagoMoto(data)
      .then(() => {
        Swal.fire("", "Listo", "success");
        getMotosDia().then((res) => {
          setData(res);
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
          "Solo el Admin tiene permitido eliminar Facturas!",
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
                  setData(res);
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
      <Typography component="h1" variant="h4" textAlign="center" marginTop={5}>
        {data.date}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pago</TableCell>
            <TableCell align="left">Placa</TableCell>
            <TableCell align="right">Asignar Equipo</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.Facturas.map(({ id, isPaid, Motorcycle, Employees }) => (
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
