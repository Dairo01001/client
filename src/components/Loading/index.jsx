import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        width: "100%",
      }}
    >
      <div className="lds-hourglass"></div>
    </div>
  );
};

export default Loading;
