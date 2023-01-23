import React, { useState } from "react";
import Loading from "../../components/Loading";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailDate } from "../../services/report";
import { AppBar, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Report() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getDetailDate(id).then((res) => {
      setData(res);
    });
  }, [id]);

  if (!data) {
    return <Loading />;
  }

  return (
    <TableContainer component={Paper}>
      <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Motos: ${data.Facturas.length}, Total: ${data.Facturas.reduce((acc, curr) => acc + +curr.total , 0)}$`}
          </Typography>
          <Button onClick={() => navigate("/admin")} color="inherit">atras</Button>
        </Toolbar>
      </AppBar>
    </Box>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Placa</TableCell>
            <TableCell align="right">Combo</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Pago</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.Facturas.map(({Combo, Motorcycle, id, isPaid, total}) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {Motorcycle.plaque}
              </TableCell>
              <TableCell align="right">{Combo.name}</TableCell>
              <TableCell align="right">{total}</TableCell>
              <TableCell align="right">{isPaid ? "Si" : "No"}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
