import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Groups3Icon from "@mui/icons-material/Groups3";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link } from "react-router-dom";
import CreateTeam from "../../components/CreateTeam";
import TeamTable from "../../components/TeamTable";

const Team = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab icon={<Groups3Icon />} label="Equipos" />
        <Tab icon={<AddBoxIcon />} label="Agregar Equipo" />
        <Tab
          LinkComponent={Link}
          to="/admin"
          icon={<ArrowBackIcon />}
          label="Admin"
        />
      </Tabs>
      {value === 0 ? <TeamTable /> : value === 1 ? <CreateTeam /> : null}
    </div>
  );
};

export default Team;
