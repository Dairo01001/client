import { Button, FormControl, Grid, Input, InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Swal from "sweetalert2";
import SendIcon from "@mui/icons-material/Send";
import { formatDate } from "../../utils/formatDate";

export default function ReportData() {
  const [input, setInput] = useState({ year: "", mount: "", day: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      setInput({ ...input, [name]: value.trim() });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      input.year.length !== 4 ||
      input.mount.length > 2 ||
      input.day.length > 2
    ) {
      return Swal.fire("Opss!", "Error en el año o mes ingresado", "warning");
    }

    
    console.log(formatDate(input.year, input.mount, input.day));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
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
            <Input
              name="mount"
              value={input.mount}
              onChange={handleChange}
              required
              id="mount"
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="day">Día</InputLabel>
            <Input
              name="day"
              value={input.day}
              onChange={handleChange}
              id="day"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="outlined" endIcon={<SendIcon />}>
            Generar Reporte
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
