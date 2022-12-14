import * as React from "react";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { signup } from "../../services/login";
import PercentIcon from "@mui/icons-material/Percent";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { getRoles } from "../../services/roll";

const SignUp = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [input, setInput] = React.useState({
    dni: "",
    names: "",
    surnames: "",
    phone: "",
    commission: 0,
    RollId: "",
  });
  const [roles, setRoles] = React.useState([]);
  const [birthDate, setBirthDate] = React.useState(dayjs("2000-01-01"));

  React.useEffect(() => {
    if (!user) {
      Swal.fire("Error!", "Nesecitas estar logueado!", "warning");
      navigate("/");
    } else if (user.role !== "ADMIN") {
      Swal.fire("Error!", "No tienes permisos para esta accion!", "error");
      navigate("/admin");
    }
    getRoles().then((data) => {
      setRoles(data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    signup({ ...input, birthDate: birthDate.toString() }, user.token)
      .then((data) => {
        Swal.fire(
          "Registro Completo",
          "Empleado Registrado con Exito!",
          "success"
        );
        setInput({
          dni: "",
          names: "",
          surnames: "",
          phone: "",
          commission: 0,
        });
        navigate("/admin");
      })
      .catch((err) => {
        Swal.fire("Error!", err.response.data.msg, "error");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Nuevo Empleado
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                autoFocus
                name="dni"
                label="Numero identificacion"
                id="dni"
                value={input.dni}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="role">Roll</InputLabel>
                <Select
                  labelId="role"
                  name="RollId"
                  label="Roll"
                  value={input.RollId}
                  onChange={handleChange}
                >
                  {roles.map(({ id, role }) => (
                    <MenuItem key={id} value={id}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                required
                fullWidth
                type="number"
                autoFocus
                name="commission"
                label="Comision"
                id="commission"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PercentIcon />
                    </InputAdornment>
                  ),
                }}
                value={input.commission}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="names"
                required
                fullWidth
                id="names"
                label="Nombre(s)"
                value={input.names}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="surnames"
                label="Apellido(s)"
                name="surnames"
                value={input.surnames}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Telefono"
                name="phone"
                value={input.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label="Fecha Nacimiento"
                  inputFormat="MM/DD/YYYY"
                  value={birthDate}
                  onChange={(newValue) => {
                    setBirthDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
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
    </div>
  );
};

export default SignUp;
