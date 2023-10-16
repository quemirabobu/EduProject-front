import { AppBar, Toolbar, Tabs, Tab, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const linkStyle = { textDecoration: "none", color: "inherit" };

const NavigationTab = ({ label, to, onClick }) => (
  <Link to={to || "#"} style={linkStyle} onClick={onClick}>
    <Tab label={label} />
  </Link>
);

const HeaderTabs = ({ value, onChange }) => (
  <Tabs
    textColor="secondary"
    indicatorColor="secondary"
    value={value}
    onChange={onChange}
    TabIndicatorProps={{ style: { height: 0 } }}
  >
    <NavigationTab label="로 그 인" to="/login" />
  </Tabs>
);

const BasicHeader = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={5}
      sx={{
        backgroundColor: "#ffffff",
        opacity: 0.9,
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
        height: "50px",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          margin: "-0.8vh 7vw",
        }}
      >
        <Link to="/" style={linkStyle}>
          <Typography sx={{ fontSize: "18px", color: "#5AC467" }}>
            EduVenture
          </Typography>
        </Link>
        <HeaderTabs value={tabValue} onChange={handleTabChange} />
      </Toolbar>
    </AppBar>
  );
};

export default BasicHeader;
