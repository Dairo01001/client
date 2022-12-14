import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { retiroMenor } from "../../services/product";
import Swal from "sweetalert2";
import { Tab, Tabs } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TablaCajaMenor from "./TablaCajaMenor";

function Retiro() {
  const [input, setInput] = React.useState({ amount: "", description: "" });
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!!user) {
      retiroMenor(input, user.token)
        .then((res) => {
          Swal.fire("", "Listo", "success");
          setInput({ amount: "", description: "" });
          navigate("/admin");
        })
        .catch((res) => {
          Swal.fire("", res.response.data.msg, "error");
        });
    } else {
      Swal.fire("", "Nesecitas estar logueado", "warning");
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
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
              name="amount"
              type="number"
              required
              fullWidth
              label="Cantidad"
              autoFocus
              value={input.amount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              label="Descripcion"
              name="description"
              value={input.description}
              onChange={handleChange}
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

export default function CajaMenor() {
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab icon={<AnalyticsIcon />} label="Retiros" />
        <Tab icon={<PointOfSaleIcon />} label="Retiro" />
        <Tab
          icon={<ArrowBackIcon />}
          LinkComponent={Link}
          to="/admin"
          label="Admin"
        />
      </Tabs>
      {value === 0 ? <TablaCajaMenor /> : value === 1 ? <Retiro /> : null}
    </>
  );
}
