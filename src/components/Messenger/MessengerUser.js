import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const messageBox = {
  width: "100%",
  height: "10vh",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f2f2f2",
  padding: "0px",
  cursor: "pointer",
};

const clickedMessageBox = {
  ...messageBox,
  backgroundColor: "#ffffff",
};

const textContainer = {
  flex: 1,
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
};

const messageBoxDeco = {
  backgroundColor: "#5ac467",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  margin: "0px 30px",
};

const MessengerUser = ({
  isSelected,
  channelInfo = {},
  onSelect = () => {},
  claName,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!channelInfo || !channelInfo.id) return; // userInfo나 userInfo.id가 없으면 아무것도 실행하지 않습니다.

    if (isSelected) {
      onSelect(null);
      navigate("/messenger");
    } else {
      onSelect(channelInfo);
      navigate(`/messenger/${channelInfo.id}`);
    }
  };
  console.log("너가 해결의 열쇠다.", channelInfo);
  console.log("해결의 열쇠와 짝꿍", claName);
  /** channelInfo와 DB에 저장되어 있는 학생의 반을 비교해서 표출 */
  if (
    channelInfo &&
    (claName === channelInfo.name ||
      channelInfo.name === "[ 공식 ] ✅ EduVenture")
  ) {
    return (
      <Box
        sx={isSelected ? clickedMessageBox : messageBox}
        onClick={handleClick}
      >
        <Box sx={textContainer}>
          <div className="messageBoxDeco" style={messageBoxDeco} />
          <b>{channelInfo.name}</b>
        </Box>
      </Box>
    );
  }

  // channelInfo가 없거나 조건에 맞지 않는 경우에는 null 반환하여 메신저 박스 생성 방지
  return null;
};

export default MessengerUser;
