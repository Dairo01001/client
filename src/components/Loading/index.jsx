import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: 500, width: "100%" }}>
      <CircularProgress size={90} />
    </Box>
  );
};

export default Loading;
