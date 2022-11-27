import React from "react";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Copyright from "../../components/Copyright";
import login from "../../services/login";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/reducers/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    dni: "",
    password: "",
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (input.dni && input.password) {
      login
        .login(input)
        .then((data) => {
          dispatch(addUser(data));
          setInput({ dni: "", password: "" });
          const { role, id } = data;
          if (role === "ADMIN" || role === "AUXIL") {
            navigate("/admin");
          } else {
            navigate(`/employee/${id}`);
          }
        })
        .catch((err) => {
          Swal.fire("Error!", err.response.data.msg, "error");
        });
    } else {
      Swal.fire("Ups!", "Tienes que completar todos los campos", "error");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div>
      <CssBaseline />;
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography fontSize="30px" component="h1">
          The Best Washing
        </Typography>
        <Box
          component="form"
          onSubmit={handleOnSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            type="text"
            required
            fullWidth
            id="dni"
            name="dni"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            autoFocus
            value={input.dni}
            onChange={handleOnChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
            type="password"
            id="password"
            value={input.password}
            onChange={handleOnChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            endIcon={<SendIcon />}
          >
            Entrar
          </Button>
        </Box>
        <Copyright />
      </Box>
    </div>
  );
};

export default Login;
