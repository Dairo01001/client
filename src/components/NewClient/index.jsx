import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from "@mui/icons-material/Phone";
import ColorSelect from "../ColorSelect";
import BrandSelect from "../BrandSelect";
import ComboSelect from "../ComboSelect";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Swal from "sweetalert2";
import { buscarMotoPlaca } from "../../services/moto";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFactura,
  changeMoto,
  changePerson,
  setMoto,
  setPerson,
} from "../../redux/reducers/faturaSlice";
import { checkFactura, checkMoto, checkPerson } from "../../utils/check";
import { createFacturaPreventa } from "../../services/factura";
import { useNavigate } from "react-router-dom";

const NewClient = () => {
  const persona = useSelector((state) => state.factura.person);
  const moto = useSelector((state) => state.factura.moto);
  const factura = useSelector((state) => state.factura.factura);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeMoto = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeMoto({
        name,
        value: name === "plaque" ? value.toUpperCase() : value,
      })
    );
  };

  const handleChangePerson = (e) => {
    const { name, value } = e.target;
    dispatch(changePerson({ name, value }));
  };

  const handleChangeFactura = (e) => {
    const { name, value } = e.target;
    dispatch(changeFactura({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkFactura(factura) && checkPerson(persona) && checkMoto(moto)) {
      createFacturaPreventa({ moto, persona, factura })
        .then((data) => {
          Swal.fire("", "Venta Registrada!", "success");
          navigate(`/venta/${data.id}`);
        })
        .catch((err) => {
          Swal.fire("Ups!", err.response.data.msg, "error");
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
          dispatch(
            setMoto({
              ...moto,
              BrandId: BrandId || "",
              ColorId: ColorId || "",
            })
          );
          dispatch(
            setPerson({
              phone: Person.phone,
              fullName: Person.fullName,
            })
          );
        })
        .catch(() => {
          Swal.fire("", "No se encuentra registrada", "warning");
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
              value={persona.fullName}
              onChange={handleChangePerson}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="phone"
              autoComplete="off"
              type="number"
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
              value={persona.phone}
              onChange={handleChangePerson}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <ComboSelect
              ComboId={factura.ComboId}
              handleChangeFactura={handleChangeFactura}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="overrun"
              label="Sobre Costo"
              type="number"
              fullWidth
              InputProps={{
                endAdornment: <MonetizationOnIcon />,
              }}
              value={factura.overrun}
              onChange={handleChangeFactura}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="total"
              label="Total"
              fullWidth
              disabled
              InputProps={{
                endAdornment: <MonetizationOnIcon />,
              }}
              value={Number(factura.overrun) + Number(factura.price)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="isPaid">Pago</InputLabel>
              <Select
                labelId="isPaid"
                name="isPaid"
                label="Pago"
                value={factura.isPaid}
                onChange={handleChangeFactura}
              >
                <MenuItem value={true}>Si</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="paymentMethod">Metodo Pago</InputLabel>
              <Select
                labelId="paymentMethod"
                name="paymentMethod"
                label="Metodo Pago"
                value={factura.paymentMethod}
                onChange={handleChangeFactura}
              >
                <MenuItem value={"Nequi"}>Nequi</MenuItem>
                <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
              </Select>
            </FormControl>
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
