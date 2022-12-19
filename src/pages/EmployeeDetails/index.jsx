import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getEmployeeId } from "../../services/employee";
import { getRoles } from "../../services/roll";
import Swal from "sweetalert2";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [input, setInput] = useState({
    RollId: "",
    dni: "",
    names: "",
    surnames: "",
    commission: "",
    phone: "",
  });
  const [passwords, setPasswords] = useState({ password: "", password1: "" });
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getEmployeeId(id).then((res) => {
      setInput(res);
    });
    getRoles().then((res) => setRoles(res));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwords.password !== passwords.password1) {
      return Swal.fire("Error", "Las Contraseñas no coinciden", "error");
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
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <EditIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Actualizar Empleado
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="names"
              required
              fullWidth
              id="names"
              label="Nombre(s)"
              value={input.names}
              onChange={handleChange}
              autoFocus
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
          <Grid item xs={12} sm={5}>
            <TextField
              required
              fullWidth
              type="number"
              id="dni"
              label="Identificacion"
              name="dni"
              value={input.dni}
              disabled
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
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              type="number"
              id="commission"
              label="Comision"
              name="commission"
              value={input.commission}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="password"
              label="Nueva contraseña"
              type="password"
              id="password"
              value={passwords.password}
              onChange={handleChangePassword}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="password1"
              label="Repetir contraseña"
              type="password"
              id="password1"
              value={passwords.password1}
              onChange={handleChangePassword}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Actualizar
        </Button>
      </Box>
    </Box>
  );
}
