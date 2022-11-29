import {
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
import { getMotosDia } from "../../services/moto";
import Loading from "../Loading";

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
            <TableCell>Ver</TableCell>
            <TableCell>Placa</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </TableContainer>
  );
};

export default MotosTable;
