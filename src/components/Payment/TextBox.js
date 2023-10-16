import React from "react";
import { Paper } from "@mui/material";
import PaymentModal from "./PaymentModal";

const textBoxStyle = {
  height: "18%",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "space-between",
  backgroundColor: "#fff",
  paddingBottom: "20px",
  paddingLeft: "50px",
  paddingRight: "50px",
};

const TextBox = ({ academyName, month, amount }) => (
  <Paper sx={textBoxStyle}>
    <span style={{ fontSize: "1.5vw", fontWeight: "lighter" }}>
      {academyName}
      <br />
      <div style={{ fontSize: "2.5vw", fontWeight: "normal" }}>
        {month} <PaymentModal /> 교육비
      </div>
    </span>
    <div style={{ fontSize: "2vw" }}>{amount}</div>
  </Paper>
);

export default TextBox;
