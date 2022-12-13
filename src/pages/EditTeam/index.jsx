import { Avatar, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import EditIcon from '@mui/icons-material/Edit';
import { getTeamId } from "../../services/team";
import { useSelector } from "react-redux";

const EditTeam = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const operarios = useSelector((state) => state.team.operators);
  const [select, setSelect] = useState({ operario: "", operario1: "" });

  useEffect(() => {
    getTeamId(id).then((res) => {
      setTeam(res);
    });
  }, [id]);

  if (!team) {
    return <Loading />
  }

  const operatorSelect = (e) => {
    const { name, value } = e.target;
    setSelect({
      ...select,
      [name]: value,
    });
  };

  console.log(team);

  return <Box sx={{
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}>
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
      <EditIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Editar Equipo
    </Typography>
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            name="name"
            required
            fullWidth
            label="Nombre Equipo"
            value={team.name}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth >
            <InputLabel id="operario">
              Operario 1
            </InputLabel>
            <Select
              labelId="operario"
              label="Operario 1"
              name="operario"
              onChange={operatorSelect}
              value={select.operario}
            >
              {operarios.map(({ id, names, surnames }) => (<MenuItem value={id} key={id}>{`${names} ${surnames}`}</MenuItem>))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth >
            <InputLabel id="operario">
              Operario 2
            </InputLabel>
            <Select
              labelId="operario"
              label="Operario 2"
              name="operario1"
              onChange={operatorSelect}
              value={select.operario}
            >
              {operarios.map(({ id, names, surnames }) => (<MenuItem value={id} key={id}>{`${names} ${surnames}`}</MenuItem>))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Editar
      </Button>
    </Box>
  </Box>;
}

export default EditTeam;