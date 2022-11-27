import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/reducers/userSlice";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const AdminOptions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }} component="nav">
      <ListItemButton
        onClick={() => {
          navigate("/employee");
        }}
      >
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Empleados" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/team");
        }}
      >
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Equipos" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/combo");
        }}
      >
        <ListItemIcon>
          <AddToPhotosIcon />
        </ListItemIcon>
        <ListItemText primary="Combos" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          Swal.fire({
            title: "Salir!",
            text: "¿Seguro desea salir?",
            icon: "warning",
            showCancelButton: true,
          }).then((res) => {
            if (res.isConfirmed) {
              dispatch(removeUser());
              navigate("/");
            }
          });
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItemButton>
    </List>
  );
};

export default AdminOptions;
