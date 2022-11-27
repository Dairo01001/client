import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HiveIcon from "@mui/icons-material/Hive";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import CreateCombo from "../../components/CreateCombo";
import CombosTable from "../../components/CombosTable";

const Combos = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
        <Tab icon={<HiveIcon />} label="Combos"></Tab>
        <Tab icon={<AddBoxIcon />} label="Nuevo Combo"></Tab>
        <Tab
          LinkComponent={Link}
          to="/admin"
          icon={<LogoutIcon />}
          label="Admin"
        ></Tab>
      </Tabs>
      {value === 0 ? <CombosTable /> : value === 1 ? <CreateCombo /> : null}
    </>
  );
};

export default Combos;
