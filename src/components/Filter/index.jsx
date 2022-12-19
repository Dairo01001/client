import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { filter } from "../../redux/reducers/motoSlice";

export default function Filterd() {
  const [param, setParam] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setParam(event.target.value);
    dispatch(filter(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filtros</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={param}
          label="Filtros"
          onChange={handleChange}
        >
          <MenuItem value="all">Todas</MenuItem>
          <MenuItem value="paid">Pagada</MenuItem>
          <MenuItem value="notPaid">Sin pagar</MenuItem>
          <MenuItem value="team">Con equipo</MenuItem>
          <MenuItem value="notTeam">Sin Equipo</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
