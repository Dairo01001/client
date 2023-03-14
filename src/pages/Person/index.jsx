import {
  Avatar,
  Button,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPersonID } from "../../services/person";
import Loading from "../../components/Loading";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import Swal from "sweetalert2";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Person = () => {
  const { id } = useParams();
  const [persona, setPersona] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getPersonID(id).then((data) => {
      setPersona(data);
    });
  }, [id]);

  if (!persona) {
    return <Loading />;
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Telefono copiado al portapapeles",
      showConfirmButton: false,
      timer: 1000,
    });
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
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <PersonIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {persona.fullName}
      </Typography>
      <Box component="form" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              name="phone"
              disabled
              label="Telefono"
              required
              fullWidth
              value={persona.phone}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => handleCopy(persona.phone)}>
                    <ContactPhoneIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            {persona.Motorcycles.map((moto) => (
              <TableContainer
                key={moto.id}
                sx={{ mt: 3, mb: 2 }}
                component={Paper}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Placa</TableCell>
                      <TableCell align="right">Marca</TableCell>
                      <TableCell align="right">Color</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                      <TableCell>
                        <IconButton size="small" onClick={() => setOpen(!open)}>
                          {open ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {moto.plaque}
                      </TableCell>
                      <TableCell align="right">{moto.Brand.brand}</TableCell>
                      <TableCell align="right">{moto.Color.color}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                            >
                              <a
                                href={`https://api.whatsapp.com/send/?phone=$57${
                                  persona.phone
                                }&text=${encodeURI(
                                  `Hola, ${persona.fullName}, este mensaje es para informarle que su motocicleta ya esta lista!`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Moto lista WhatsApp
                              </a>
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Fecha</TableCell>
                                  <TableCell>Nombre Combo</TableCell>
                                  <TableCell>Precio</TableCell>
                                  <TableCell>Total</TableCell>
                                  <TableCell>Equipo</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {moto.Facturas.map(
                                  ({ id, date, Combo, Employees, total }) => {
                                    return (
                                      <TableRow key={id}>
                                        <TableCell>{date}</TableCell>
                                        <TableCell>{Combo.name}</TableCell>
                                        <TableCell>{Combo.price}</TableCell>
                                        <TableCell>{total}</TableCell>
                                        <TableCell>
                                          {Employees.length === 0
                                            ? "Sin asignar"
                                            : Employees[0].Team?.name}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  }
                                )}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ))}
          </Grid>
        </Grid>
        <Button
          onClick={() => navigate("/admin")}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Atras
        </Button>
      </Box>
    </Box>
  );
};

export default Person;
