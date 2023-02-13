import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Swal from "sweetalert2";
import SendIcon from "@mui/icons-material/Send";
import { utils, writeFile } from "xlsx";
import { getData, getDataDrawOut } from "../../services/report";
import { formatDate } from "../../utils/formatDate";

const typeReports = ["Motos", "Retiros"];

export default function ReportData() {
  const [input, setInput] = useState({ year: "", mount: "", day: "" });
  const [typeReport, setTypeReport] = useState(typeReports[0]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      setInput({ ...input, [name]: value.trim() });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      input.year.length !== 4 ||
      input.mount.length > 2 ||
      input.day.length > 2
    ) {
      return Swal.fire("Opss!", "Error en el año o mes ingresado", "warning");
    }

    const stringDate = formatDate(input.year, input.mount, input.day);

    const data =
      typeReport !== typeReports[0]
        ? await getDataDrawOut(stringDate)
        : await getData(stringDate);

    const worksheet = utils.json_to_sheet(data.data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Reporte");

    utils.sheet_add_aoa(worksheet, data.header, {
      origin: "A1",
    });

    writeFile(workbook, `${typeReport}_${stringDate}.xlsx`, {
      compression: true,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <h1 style={{ textAlign: "center", color: "blue" }}>Reportes</h1>
      </Grid>
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
          <FormControl fullWidth>
            <InputLabel id="typeReport">Tipo de reporte</InputLabel>
            <Select
              labelId="typeReport"
              value={typeReport}
              label="Tipo de reporte"
              onChange={(e) => setTypeReport(e.target.value)}
            >
              {typeReports.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            endIcon={<SendIcon />}
          >
            Generar Reporte
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
