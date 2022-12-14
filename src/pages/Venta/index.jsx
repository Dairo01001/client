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
import { useDispatch, useSelector } from "react-redux";
import TeamMenbers from "../../components/TeamMenbers";
import { getMotosDia } from "../../services/moto";
import { addData } from "../../redux/reducers/motoSlice";

const Venta = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [nameTeam, setNameTeam] = useState("");
  const [message, setMessage] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const TeamId = useSelector((state) => state.team.TeamId);
  const employeesTeam = useSelector((state) => state.team.employeesTeam);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getFacturaId(id)
      .then((data) => {
        if (data.Employees.length !== 0) {
          navigate("/admin");
        }
        setData(data);
      })
      .catch((err) => {
        Swal.fire("Ups!", err.response.data.msg, "error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        .then(() => {
          const newMessage = `Hola, ${
            data.Motorcycle.Person.fullName
          }, el siguiente mensaje es para informarle que su motocicleta  con la placa ${
            data.Motorcycle.plaque
          }, ha empezado a ser lavada el equipo a cargo es ${nameTeam}, aquí algunas observaciones: ${
            observaciones || "Ninguna"
          }.`;
          setMessage(newMessage);
          getMotosDia().then((res) => {
            dispatch(addData(res));
          });
          Swal.fire("", "Listo", "success");
        })
        .catch((err) => {
          Swal.fire("Ups!", err.response.data.msg, "error");
        });
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
          {!message && (
            <Grid item xs={12} sm={12}>
              <TeamSelect setNameTeam={setNameTeam} TeamId={TeamId} />
            </Grid>
          )}
          <Grid item xs={12} sm={12}>
            <TeamMenbers />
          </Grid>
          {!message && (
            <Grid item xs={12} sm={12}>
              <TextareaAutosize
                style={{ width: "100%", minHeight: 50, fontSize: "1.3rem" }}
                maxRows={2}
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </Grid>
          )}
        </Grid>
        {!message && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Listo
          </Button>
        )}

        {message && (
          <a
            href={`https://api.whatsapp.com/send/?phone=$57${
              data.Motorcycle.Person.phone
            }&text=${encodeURI(message)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enviar mensaje WhatsApp!
          </a>
        )}
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate("/admin")}
          sx={{ mt: 3, mb: 2 }}
        >
          Atras
        </Button>
      </Box>
    </Box>
  );
};

export default Venta;
