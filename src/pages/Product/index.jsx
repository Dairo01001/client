import { Tab, Tabs } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import CreateProduct from "./CreateProduct";
import ProductTable from "./ProductTable";
import RetirarProduct from "./RetirarProduct";

export default function Product() {
  const [value, setValue] = useState(0);

  return (
    <>
      <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
        <Tab icon={<ArticleIcon />} label="Productos" />
        <Tab icon={<AddCircleIcon />} label="Registrar" />
        <Tab icon={<AssignmentReturnIcon />} label="Retirar" />
        <Tab
          icon={<ArrowBackIcon />}
          LinkComponent={Link}
          to="/admin"
          label="Admin"
        />
      </Tabs>
      {value === 0 ? (
        <ProductTable />
      ) : value === 1 ? (
        <CreateProduct />
      ) : value === 2 ? (
        <RetirarProduct />
      ) : null}
    </>
  );
}
