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
  handleLectureMenuOpen,
  handleUserMenuOpen,
  value,
  onChange,
}) => {
  const userName = sessionStorage.getItem("userName");
  // const userName = isLogin ? sessionStorage.getItem("userName") : null;

  return (
    <Tabs
      textColor="secondary"
      indicatorColor="secondary"
      value={value}
      onChange={onChange}
      TabIndicatorProps={{ style: { height: 0 } }}
    >
      <NavigationTab label="출 결" to="/attend" />
      <NavigationTab label="수 업" onClick={handleLectureMenuOpen} />
      <NavigationTab label="차 량" to="/location" />
      <NavigationTab label="수 납" to="/payment" />
      <NavigationTab label="메 신 저" to="/messenger" />
      <NavigationTab
        label={`${userName ? `${userName} 님` : "Guest"}`}
        onClick={handleUserMenuOpen}
      />
    </Tabs>
  );
};

const UserHeader = ({ isLogin }) => {
  const [lectureMenuAnchor, setLectureMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [value, setValue] = useState(0);

  const handleLectureMenuOpen = (event) =>
    setLectureMenuAnchor(event.currentTarget);
  const handleLectureMenuClose = () => setLectureMenuAnchor(null);

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
          handleLectureMenuOpen={handleLectureMenuOpen}
          handleUserMenuOpen={handleUserMenuOpen}
          value={value}
          onChange={handleChange}
          isLogin={isLogin}
        />
        <Menu
          anchorEl={lectureMenuAnchor}
          open={Boolean(lectureMenuAnchor)}
          onClose={handleLectureMenuClose}
        >
          <MenuItems handleClose={handleLectureMenuClose} to="/lecture">
            수업 정보
          </MenuItems>
          <MenuItems handleClose={handleLectureMenuClose} to="/streaming">
            실시간 수업
          </MenuItems>
          <MenuItems handleClose={handleLectureMenuClose} to="/video">
            수업 영상
          </MenuItems>
          <MenuItems handleClose={handleLectureMenuClose} to="/quizboard-list">
            퀴즈 풀기
          </MenuItems>
          <MenuItems handleClose={handleLectureMenuClose} to="/matchClass">
            일대일 수업
          </MenuItems>
        </Menu>
        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}
        >
          <MenuItems handleClose={handleUserMenuClose} to="/user/mypage">
            사용자 수정
          </MenuItems>
          <MenuItems
            handleClose={handleUserMenuClose}
            to="/user/changePassword"
          >
            비밀번호 수정
          </MenuItems>
          <MenuItems handleClose={handleLogout}>로그아웃</MenuItems>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
