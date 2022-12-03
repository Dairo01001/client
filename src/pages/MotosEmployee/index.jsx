import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import Avatar from "@mui/material/Avatar";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import PercentIcon from "@mui/icons-material/Percent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { getGanacias } from "../../services/operator";

const MotosEmployee = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user) {
      Swal.fire("Ups!", "Nesecitas estar logueado!", "error");
      navigate("/");
    } else {
      getGanacias(user.id)
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          Swal.fire("Ups!", err.response.data.msg, "error");
        });
    }
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <PointOfSaleIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Ganacias Día
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="dni"
              fullWidth
              label="Identificacion"
              disabled
              value={data.dni}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Comision"
              name="commision"
              disabled
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <PercentIcon />
                  </IconButton>
                ),
              }}
              value={data.commission}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre Completo"
              name="fullName"
              disabled
              value={`${data.names} ${data.surnames}`}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="gananciasDia"
              fullWidth
              label="Ganancias día"
              disabled
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <AttachMoneyIcon />
                  </IconButton>
                ),
              }}
              value={data.gananciasDia}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Motos lavadas"
              name="motorcycleWashing"
              disabled
              value={data.motorcycleWashing}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ mt: 3, mb: 2 }}
        >
          Salir
        </Button>
      </Box>
    </Box>
  );
};

export default MotosEmployee;
