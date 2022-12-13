import {
  Collapse,
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
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../../components/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct, getProductsDrawOut } from "../../../services/product";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box } from "@mui/system";

function Row({ id, quantityUnit, name, measure, DrawOutProducts }) {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="right">{quantityUnit}</TableCell>
        <TableCell align="right">{measure}</TableCell>
        <TableCell align="right">
          <IconButton
            onClick={() => {
              if (!user) {
                Swal.fire("Error", "Nesecitas estar logueado", "error");
                navigate("/");
              } else {
                deleteProduct(id, user.token).then(() => {
                  Swal.fire("", "Done", "success");
                  navigate("/admin");
                });
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Historial Retiros
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Retirado por</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DrawOutProducts.map(({ id, amount, Fecha, Employee }) => (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">
                        {Fecha?.date}
                      </TableCell>
                      <TableCell>{Employee.names}</TableCell>
                      <TableCell align="right">{`${amount} ${measure}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function ProductTable() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProductsDrawOut().then((data) => {
      setProducts(data);
    });
  }, []);

  if (!products) {
    return <Loading />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell align="right">Medida</TableCell>
            <TableCell align="right">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((elem) => (
            <Row key={elem.id} {...elem} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
