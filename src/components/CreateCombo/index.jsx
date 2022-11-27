import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Swal from "sweetalert2";
import { createCombo, getCombos } from "../../services/combo";
import { useDispatch } from "react-redux";
import { addCombos } from "../../redux/reducers/comboSlice";
import { useNavigate } from "react-router-dom";

const CreateCombo = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.title.length > 4) {
      createCombo(input)
        .then(() => {
          Swal.fire("", "Combo Creado!", "success");
          getCombos().then((data) => {
            dispath(addCombos(data));
          });
          setInput({
            title: "",
            price: 0,
          });
          navigate("/admin");
        })
        .catch((err) => {
          Swal.fire("Upps!", err.response.data.msg, "error");
        });
    } else {
      Swal.fire(
        "Ups!",
        "El titulo debe tener por lo menos 5 letras!",
        "warning"
      );
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
      <Typography component="h1" variant="h5">
        Crear Combo
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="off"
              type="text"
              label="Titulo"
              id="title"
              fullWidth
              autoFocus
              name="title"
              required
              value={input.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              type="number"
              id="price"
              name="price"
              label="Precio"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              required
              value={input.price}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Crear
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCombo;
