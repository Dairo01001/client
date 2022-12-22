import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import EmployeeWashing from "../EmployeeWashing";
import DetalleVentas from "../DetalleVentas";

export default function Sales() {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab icon={<AssignmentIndIcon />} label="Ganancia empleados" />
        <Tab icon={<PointOfSaleIcon />} label="Informacion General" />
        <Tab
          icon={<ArrowBackIcon />}
          LinkComponent={Link}
          to="/admin"
          label="Admin"
        />
      </Tabs>
      {value === 0 ? <EmployeeWashing /> : <DetalleVentas />}
    </>
  );
}
