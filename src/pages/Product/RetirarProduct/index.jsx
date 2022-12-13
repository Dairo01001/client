import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import { getProducts, retirarProduct } from "../../../services/product";

export default function RetirarProduct() {
  const [input, setInput] = useState({ amount: "", ProductId: "" });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!!input.amount && !!input.ProductId) {
      if (!user) {
        Swal.fire("", "Nesecitas estar logueado", "warning");
        navigate("/");
      } else {
        retirarProduct(input, user.token)
          .then((data) => {
            Swal.fire("", "Listo", "success");
            setInput({ amount: "", ProductId: "" });
            navigate("/admin");
          })
          .catch((err) => {
            Swal.fire("", err.response.data.msg, "error");
          });
      }
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel id="product">Producto</InputLabel>
              <Select
                labelId="product"
                name="ProductId"
                label="Producto"
                value={input.ProductId}
                onChange={handleChange}
              >
                {products.map(({ id, name, measure, quantityUnit }) => (
                  <MenuItem
                    key={id}
                    value={id}
                  >{`${name} ${quantityUnit} ${measure}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              type="number"
              name="amount"
              required
              fullWidth
              label="Cantidad a retirar"
              onChange={handleChange}
              value={input.amount}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Retirar
        </Button>
      </Box>
    </Box>
  );
}
