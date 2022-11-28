import { Button, Grid, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from "@mui/icons-material/Phone";
import ColorSelect from "../ColorSelect";
import BrandSelect from "../BrandSelect";
import ComboSelect from "../ComboSelect";
import TeamSelect from "../TeamSelect";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Swal from "sweetalert2";
import { buscarMotoPlaca, crearMotoPersona } from "../../services/moto";
import { checkMoto, checkUser } from "../../utils/check";

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

  const [factura, setFactura] = useState({
    ComboId: "",
    TeamId: "",
    overrun: 0,
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

  const handleChangeFactura = (e) => {
    const { name, value } = e.target;
    setFactura({
      ...factura,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkUser(person) && checkMoto(moto)) {
      crearMotoPersona({ moto, person, factura }).then((data) => {
        Swal.fire("", "Venta Registrada!", "success");
      });
    } else {
      Swal.fire("Ups!", "Rellena todos los Campos!", "warning");
    }
  };

  const searchPlaque = () => {
    if (!moto.plaque) {
      Swal.fire("Ups!", "Escribe un placa primero!", "warning");
    } else {
      buscarMotoPlaca(moto.plaque)
        .then(({ BrandId, ColorId, Person }) => {
          setMoto({
            ...moto,
            BrandId,
            ColorId,
          });
          setPerson({
            phone: Person.phone,
            fullName: Person.fullName,
          });
        })
        .catch(() => {
          Swal.fire("", "No se encuentra registrada", "success");
        });
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
      <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
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
          <Grid item xs={12} sm={3}>
            <ColorSelect
              ColorId={moto.ColorId}
              handleChangeMoto={handleChangeMoto}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <BrandSelect
              BrandId={moto.BrandId}
              handleChangeMoto={handleChangeMoto}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <TeamSelect
              TeamId={factura.TeamId}
              handleChangeMoto={handleChangeFactura}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <ComboSelect
              ComboId={factura.ComboId}
              handleChangeMoto={handleChangeFactura}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="overrun"
              label="Sobre Costo"
              fullWidth
              InputProps={{
                endAdornment: <MonetizationOnIcon />,
              }}
              value={factura.overrun}
              onChange={handleChangeFactura}
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
