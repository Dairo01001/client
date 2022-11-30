import {
  Button,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { getFacturaId, setEmployeesFactura } from "../../services/factura";
import TeamSelect from "../../components/TeamSelect";
import { useSelector } from "react-redux";
import TeamMenbers from "../../components/TeamMenbers";

const Venta = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const TeamId = useSelector((state) => state.team.TeamId);
  const employeesTeam = useSelector((state) => state.team.employeesTeam);
  const navigate = useNavigate();

  useEffect(() => {
    getFacturaId(id)
      .then((data) => {
        if (data.Employees.length !== 0) {
          Swal.fire(
            "Ups!",
            "Esta moto ya tiene Empleados asignados!",
            "warning"
          );
          navigate("/admin");
        }
        setData(data);
      })
      .catch((err) => {
        Swal.fire("Ups!", err.response.data.msg, "error");
      });
  }, [id]);

  if (!data) {
    return <Loading />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!TeamId) {
      Swal.fire("Ups!", "Escoje un Equipo", "warning");
    } else {
      setEmployeesFactura({
        id,
        Employees: employeesTeam.map(({ id }) => id),
      })
        .then((data) => {
          Swal.fire("", "Listo", "success");
        })
        .catch((err) => {
          Swal.fire("Ups!", err.response.data.msg, "error");
        });
      navigate("/admin");
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
      <Typography
        component="h1"
        variant="h5"
        color={data.isPaid ? "green" : "red"}
      >
        {data.Motorcycle.plaque}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              fullWidth
              id="name"
              label="Nombre Combo"
              value={data.Combo.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              fullWidth
              id="price"
              label="Precio"
              InputProps={{
                endAdornment: <MonetizationOnIcon />,
              }}
              value={data.Combo.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              id="description"
              label="Descripcion"
              value={data.Combo.description}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TeamSelect TeamId={TeamId} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TeamMenbers />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextareaAutosize
              style={{ width: "100%", minHeight: 50, fontSize: "1.3rem" }}
              maxRows={2}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Listo
        </Button>
      </Box>
    </Box>
  );
};

export default Venta;
