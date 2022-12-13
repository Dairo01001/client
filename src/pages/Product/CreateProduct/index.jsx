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
import axios from "axios";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";

const initialState = {
  name: "",
  quantityUnit: "",
  measure: "",
};

export default function CreateProduct() {
  const [product, setProduct] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!!product.name && !!product.quantityUnit && !!product.measure) {
      axios
        .post("/api/product", product)
        .then((res) => {
          Swal.fire("", "Listo", "success");
          setProduct(initialState);
        })
        .catch((err) => {
          Swal.fire("Error", err.response.data.msg, "error");
        });
    } else {
      Swal.fire("Error", "Rellena todos los campos!", "warning");
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
            <TextField
              type="text"
              name="name"
              required
              fullWidth
              label="Nombre producto"
              onChange={handleChange}
              value={product.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              name="quantityUnit"
              required
              fullWidth
              label="Cantidad (unidad)"
              onChange={handleChange}
              value={product.quantityUnit}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="medida">Unidad de medida</InputLabel>
              <Select
                labelId="medida"
                name="measure"
                label="Unidad de medida"
                value={product.measure}
                onChange={handleChange}
              >
                <MenuItem value="ml">Milimetros</MenuItem>
                <MenuItem value="gr">Gramos</MenuItem>
                <MenuItem value="ud">Unidad</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Registrar
        </Button>
      </Box>
    </Box>
  );
}
