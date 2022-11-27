import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AdminOptions from "../../components/AdminOptions";

const Admin = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab icon={<TwoWheelerIcon />} label="Motos" />
        <Tab icon={<AddBoxIcon />} label="Nuevo Cliente" />
        <Tab icon={<AdminPanelSettingsIcon />} label="Administrar" />
      </Tabs>
      {value === 2 ? <AdminOptions /> : null}
    </>
  );
};

export default Admin;
