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
import { Link } from "react-router-dom";
import { getMotosDia } from "../../services/moto";
import Loading from "../Loading";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import NotInterestedIcon from "@mui/icons-material/NotInterested";

const MotosTable = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getMotosDia().then((res) => {
      setData(res);
    });
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <TableContainer component={Paper}>
      <Typography component="h1" variant="h4" textAlign="center" marginTop={5}>
        {data.date}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pago</TableCell>
            <TableCell align="right">Placa</TableCell>
            <TableCell align="right">Asignar Equipo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.Facturas.map(({ id, isPaid, Motorcycle}) => (
            <TableRow key={id}>
              <TableCell>
                <IconButton>
                  {isPaid ? <DoneOutlineIcon /> : <NotInterestedIcon />}
                </IconButton>
              </TableCell>
              <TableCell align="right">{Motorcycle.plaque}</TableCell>
              <TableCell align="right">
                <IconButton component={Link} to={`/venta/${id}`}>
                  <AssignmentIndIcon />
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
