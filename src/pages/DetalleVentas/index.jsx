import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { getDetailsFacturas } from "../../services/factura";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppBarBasic from "../../components/AppBarBasic";
import { Link } from "react-router-dom";

export default function DetalleVentas() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDetailsFacturas().then((data) => {
      setData(data.sort((a, b) => (a.date > b.date ? -1 : 1)));
    });
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <TableContainer component={Paper}>
      <AppBarBasic />
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell align="right">Efectivo $</TableCell>
            <TableCell align="right">Nequi $</TableCell>
            <TableCell align="right">Total $</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, date, detail }) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component={Link} scope="row" to={`/report/${id}`}>
                {date}
              </TableCell>
              <TableCell align="right">{detail.Efectivo}</TableCell>
              <TableCell align="right">{detail.Nequi}</TableCell>
              <TableCell align="right">{detail.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
