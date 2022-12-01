import {
  Avatar,
  Button,
  Grid,
  IconButton,
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

const Person = () => {
  const { id } = useParams();
  const [persona, setPersona] = useState(null);
  const navigate = useNavigate();

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
        Cliente
      </Typography>
      <Box component="form" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              name="fullName"
              disabled
              label="Nombre Completo"
              required
              fullWidth
              value={persona.fullName}
            />
          </Grid>
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
          {persona.Motorcycles.map(({ plaque, id }) => (
            <Grid key={id} item xs={12}>
              <Typography variant="subtitle1"> {`Moto: ${plaque}`}</Typography>
            </Grid>
          ))}
        </Grid>
        <Button onClick={() => navigate("/admin")} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Atras
        </Button>
      </Box>
    </Box>
  );
};

export default Person;
