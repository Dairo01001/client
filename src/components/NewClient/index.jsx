import { Button, Grid, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from "@mui/icons-material/Phone";
import ColorSelect from "../ColorSelect";
import BrandSelect from "../BrandSelect";

const NewClient = () => {
  const [person, setPerson] = useState({
    phone: "",
    fullName: "",
  });

  const [moto, setMoto] = useState({
    plaque: "",
    ColorId: "",
    BrandId: "",
  });

  const handleChangeMoto = (e) => {
    const { name, value } = e.target;
    setMoto({
      ...moto,
      [name]: value,
    });
  };

  const handleChangePerson = (e) => {
    const { name, value } = e.target;
    setPerson({
      ...person,
      [name]: value,
    });
  };

  const searchPlaque = () => {
    console.log(moto);
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
      <Box component="form" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="plaque"
              required
              fullWidth
              id="plaque"
              label="Placa"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={searchPlaque}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              value={moto.plaque}
              onChange={handleChangeMoto}
            />
          </Grid>
          <Grid item sx={12} sm={3}>
            <ColorSelect
              ColorId={moto.ColorId}
              handleChangeMoto={handleChangeMoto}
            />
          </Grid>
          <Grid item sx={12} sm={3}>
            <BrandSelect
              BrandId={moto.BrandId}
              handleChangeMoto={handleChangeMoto}
            />
          </Grid>
          <Grid item sx={12} sm={12}>
            <TextField
              name="fullName"
              required
              fullWidth
              id="fullName"
              label="Nombre y Apellidos"
              value={person.fullName}
              onChange={handleChangePerson}
            />
          </Grid>
          <Grid item sx={12} sm={6}>
            <TextField
              name="phone"
              autoComplete="off"
              required
              fullWidth
              id="phone"
              label="Telefono"
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <PhoneIcon />
                  </IconButton>
                ),
              }}
              value={person.phone}
              onChange={handleChangePerson}
            />
          </Grid>
          
        </Grid>
        <Button
          type="submit"
          sx={{ mt: 3, mb: 2 }}
          variant="contained"
          fullWidth
        >
          Preventa
        </Button>
      </Box>
    </Box>
  );
};

export default NewClient;
