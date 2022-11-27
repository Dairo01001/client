import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import SignUp from "../../components/SignUp";
import OperatorsTable from "../../components/OperatorsTable";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AuxiliarTable from "../../components/AuxiliarTable";

const Employee = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab icon={<PersonIcon />} label="Operarios" />
        <Tab icon={<AccountBoxIcon />} label="Auxiliares" />
        <Tab icon={<PersonAddAlt1Icon />} label="Nuevo" />
        <Tab
          icon={<ArrowBackIcon />}
          LinkComponent={Link}
          to="/admin"
          label="Admin"
        />
      </Tabs>
      {value === 0 ? (
        <OperatorsTable />
      ) : value === 1 ? (
        <AuxiliarTable />
      ) : value === 2 ? (
        <SignUp />
      ) : null}
    </>
  );
};

export default Employee;
