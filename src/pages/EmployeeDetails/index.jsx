import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { getEmployeeId } from "../../services/employee";
import { getRoles } from "../../services/roll";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [input, setInput] = useState(null);
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    getEmployeeId(id).then((data) => {
      setInput({ ...data, password1: data.password });
    });
    getRoles().then((data) => {
      setRoles(data);
    });
  }, []);

  if (!input || !roles) {
    return <Loading />;
  }

  console.log(roles);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Editar Empleado
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="names"
                required
                fullWidth
                id="names"
                label="Nombre(s)"
                autoComplete="off"
                value={input.names}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="surnames"
                required
                fullWidth
                id="surnames"
                label="Apellido(s)"
                autoComplete="off"
                value={input.surnames}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                name="dni"
                required
                fullWidth
                id="dni"
                label="Identificacion"
                autoComplete="off"
                value={input.dni}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="commission"
                required
                fullWidth
                id="commission"
                label="Comision"
                autoComplete="off"
                type="number"
                value={input.commission}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                name="phone"
                required
                fullWidth
                id="phone"
                label="Telefono"
                autoComplete="off"
                type="number"
                value={input.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sx={12} sm={4}>
              <InputLabel id="labelRoll">Cargo</InputLabel>
              <Select
                labelId="labelRoll"
                id="RollId"
                name="RollId"
                value={input.RollId}
                onChange={handleChange}
              >
                {roles.map(({ id, role }) => {
                  return (
                    <MenuItem key={id} value={id}>
                      {role}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default EmployeeDetails;
