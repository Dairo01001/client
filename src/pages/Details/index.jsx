import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BallotIcon from "@mui/icons-material/Ballot";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

export default function Details() {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab icon={<AnalyticsIcon />} label="Retiro Products" />
      <Tab icon={<BallotIcon />} label="Retiro caja mejor" />
      <Tab
        icon={<ArrowBackIcon />}
        LinkComponent={Link}
        to="/admin"
        label="Admin"
      />
    </Tabs>
  );
}
