import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { getFacturaId, setEmployeesFactura } from "../../services/factura";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useDispatch, useSelector } from "react-redux";
import TeamSelect from "../../components/TeamSelect";
import TeamMenbers from "../../components/TeamMenbers";
import Swal from "sweetalert2";
import { getMotosDia } from "../../services/moto";
import { addData } from "../../redux/reducers/motoSlice";

export default function Edit() {
  const { id } = useParams();
  const [factura, setFactura] = useState(null);
  const [nameTeam, setNameTeam] = useState("");
  const TeamId = useSelector((state) => state.team.TeamId);
  const employeesTeam = useSelector((state) => state.team.employeesTeam);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getFacturaId(id).then((res) => {
      setFactura(res);
    });
  }, [id]);

  if (!factura) {
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
        .then(() => {
          getMotosDia().then((res) => {
            dispatch(addData(res));
          });
          Swal.fire("", "Listo", "success");
          navigate("/admin");
        })
        .catch((err) => {
          Swal.fire("Ups!", err.response.data.msg, "error");
        });
    }
  };

  console.log(factura);

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
        color={factura.isPaid ? "green" : "red"}
      >
        {factura.Motorcycle.plaque}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              fullWidth
              id="name"
              label="Nombre Combo"
              value={factura.Combo.name}
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
              value={factura.Combo.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              id="description"
              label="Descripcion"
              value={factura.Combo.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              id="empleados"
              label="Empleados"
              value={factura.Employees.map((empleado) => empleado.names).join(
                ", "
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TeamSelect setNameTeam={setNameTeam} TeamId={TeamId} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TeamMenbers />
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
      <Button
        fullWidth
        variant="contained"
        onClick={() => navigate("/admin")}
        sx={{ mt: 3, mb: 2 }}
      >
        Atras
      </Button>
    </Box>
  );
}
