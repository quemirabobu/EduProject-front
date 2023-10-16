import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const linkStyle = { textDecoration: "none", color: "inherit" };

const userType = sessionStorage.getItem("userType");

const NavigationTab = ({ label, to, onClick }) => (
  <Link to={to || "#"} style={linkStyle} onClick={onClick}>
    <Tab label={label} />
  </Link>
);

const MenuItems = ({ handleClose, to = "#", children }) => (
  <MenuItem
    onClick={handleClose}
    component={Link}
    to={to}
    sx={{ fontSize: "12px" }}
  >
    {children}
  </MenuItem>
);

const HeaderTabs = ({
  handleClassMenuOpen,
  handleUserMenuOpen,
  value,
  onChange,
}) => {
  const userName = sessionStorage.getItem("userName");

  return (
    <Tabs
      textColor="secondary"
      indicatorColor="secondary"
      value={value}
      onChange={onChange}
      TabIndicatorProps={{ style: { height: 0 } }}
    >
      <NavigationTab label="원 생" to="/admin/student" />
      <NavigationTab label="수 업" onClick={handleClassMenuOpen} />
      {userType !== "teacher" && (
        <NavigationTab label="수 납" to="/admin/receipt" />
      )}
      <NavigationTab label="메 신 저" to="/admin/messenger" />
      <NavigationTab
        label={`${userName ? `${userName} 님` : "Teacher"}`}
        onClick={handleUserMenuOpen}
      />
    </Tabs>
  );
};

const AdminHeader = ({ isLogin }) => {
  const [classMenuAnchor, setClassMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [value, setValue] = useState(0);

  const handleClassMenuOpen = (event) =>
    setClassMenuAnchor(event.currentTarget);
  const handleClassMenuClose = () => setClassMenuAnchor(null);

  const handleUserMenuOpen = (event) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
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
        <HeaderTabs
          handleClassMenuOpen={handleClassMenuOpen}
          handleUserMenuOpen={handleUserMenuOpen}
          value={value}
          onChange={handleChange}
          isLogin={isLogin}
        />
        <Menu
          anchorEl={classMenuAnchor}
          open={Boolean(classMenuAnchor)}
          onClose={handleClassMenuClose}
        >
          <MenuItems handleClose={handleClassMenuClose} to="/admin/timetable">
            주간 시간표
          </MenuItems>
          <MenuItems handleClose={handleClassMenuClose} to="/admin/streaming">
            실시간 수업
          </MenuItems>
          <MenuItems handleClose={handleClassMenuClose} to="/admin/video">
            수업 영상
          </MenuItems>
          <MenuItems handleClose={handleClassMenuClose} to="/admin/notice">
            수업 공지사항
          </MenuItems>
          <MenuItems handleClose={handleClassMenuClose} to="/quizboard-list">
            퀴즈 관리
          </MenuItems>
          <MenuItems handleClose={handleClassMenuClose} to="/admin/matchClass">
            일대일 수업
          </MenuItems>
        </Menu>
        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}
        >
          {userType === "admin" && [
            <MenuItems
              handleClose={handleUserMenuClose}
              to="/admin/teacher"
              key="teacher-management"
            >
              선생님 관리
            </MenuItems>,
            <MenuItems
              handleClose={handleUserMenuClose}
              to="/admin/classManagement"
              key="class-management"
            >
              반 관리
            </MenuItems>,
          ]}
          <MenuItems handleClose={handleLogout} key="logout">
            로그아웃
          </MenuItems>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
