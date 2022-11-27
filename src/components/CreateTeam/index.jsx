import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { createTeam, getOperatorsTeam, getTeams } from "../../services/team";
import { addTeams, addOperatorsTeam } from "../../redux/reducers/teamSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const CreateTeam = () => {
  const [input, setInput] = useState({ name: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const operarios = useSelector((state) => state.team.operators);
  const [select, setSelect] = useState({ operario1: "", operario2: "" });

  useEffect(() => {
    if (!operarios) {
      getOperatorsTeam().then((data) => {
        dispatch(addOperatorsTeam(data));
      });
    }
  }, []);

  if (!operarios) {
    return <Loading />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.name.length > 4) {
      if (select.operario1 !== "" || select.operario2 !== "") {
        if (select.operario1 === select.operario2) {
          return Swal.fire("Ups!", "Deben ser diferentes!", "warning");
        }
        const Employees = [];
        if (select.operario1) {
          Employees.push(select.operario1);
        }
        if (select.operario2) {
          Employees.push(select.operario2);
        }

        createTeam({ ...input, Employees })
          .then((data) => {
            Swal.fire("Informacion", "Equipo creado con exito!", "success");
            getTeams().then((data) => {
              dispatch(addTeams(data));
            });
            getOperatorsTeam().then((data) => {
              dispatch(addOperatorsTeam(data));
            });
          })
          .catch((err) => {
            Swal.fire("Error!", err.response.data.msg, "error");
          });
        setInput({ name: "" });
        navigate("/admin");
      } else {
        Swal.fire("Ups!", "Debes elegir por lo menos un integrante");
      }
    } else {
      Swal.fire(
        "Upps!",
        "El nombre del equipo debe tener mas de 4 letras",
        "warning"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const operatorSelect = (e) => {
    const { name, value } = e.target;
    setSelect({
      ...select,
      [name]: value,
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        autoComplete="off"
        margin="normal"
        type="text"
        required
        fullWidth
        id="name"
        name="name"
        autoFocus
        label="Nombre Equipo"
        value={input.name}
        onChange={handleChange}
      />
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel id="labelOperario1">Operario 1</InputLabel>
        <Select
          labelId="labelOperario1"
          id="employee1"
          label="Operario 1"
          name="operario1"
          onChange={operatorSelect}
          value={select.operario1}
        >
          {operarios.map(({ id, names, surnames }) => {
            return (
              <MenuItem key={id} value={id}>{`${names} ${surnames}`}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="labelOperario2">Operario 2</InputLabel>
        <Select
          labelId="labelOperario2"
          id="employee2"
          label="Operario 2"
          name="operario2"
          onChange={operatorSelect}
          value={select.operario2}
        >
          {operarios.map(({ id, names, surnames }) => {
            return (
              <MenuItem key={id} value={id}>{`${names} ${surnames}`}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button sx={{ marginTop: 5 }} fullWidth type="submit" variant="contained">
        Crear
      </Button>
    </Box>
  );
};

export default CreateTeam;
