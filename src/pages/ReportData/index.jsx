import { FormControl, Grid, Input, InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

export default function ReportData() {
  const [input, setInput] = useState({ year: "", mount: "", day: "" });

  const handleChange = (e) => {
    const { name, value } = e.target.value;
    setInput({ ...input, [name]: value });
  };

  return (
    <Box component="form" onSubmit={(e) => e.preventDefault()}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="year">Año</InputLabel>
            <Input
              name="year"
              value={input.year}
              onChange={handleChange}
              required
              id="year"
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="mount">Mes</InputLabel>
            <Input required id="mount" />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="day">Día</InputLabel>
            <Input id="day" />
          </FormControl>
        </Grid>
        <Grid item>
          <button> Generar Reporte</button>
        </Grid>
      </Grid>
    </Box>
  );
}
