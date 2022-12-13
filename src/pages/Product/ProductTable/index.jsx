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
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../../components/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct, getProducts } from "../../../services/product";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ProductTable() {
  const [products, setProducts] = useState(null);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then((data) => {
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
            <TableCell>Nombre</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell align="right">Medida</TableCell>
            <TableCell align="right">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(({ id, name, measure, quantityUnit }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{quantityUnit}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
