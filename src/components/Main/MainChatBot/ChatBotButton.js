import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import { SpeedDialIcon, Tooltip } from "@mui/material";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";

const ChatBotButton = ({ onClick }) => {
  return (
    <Tooltip title="EduVenture에 대해 물어보세요." followCursor>
      <SpeedDial
        ariaLabel="SpeedDial"
        onClick={onClick}
        sx={{
          position: "fixed",
          bottom: "40px",
          left: "40px",
          "& .MuiFab-primary": {
            width: 70,
            height: 70,
            backgroundColor: "#5AC467",
            "&:hover": { backgroundColor: "#39A646" },
            "& .MuiSpeedDialIcon-icon": { fontSize: 40, marginTop: "-8px" },
            "& .MuiSpeedDialIcon-openIcon": {
              fontSize: 40,
              marginTop: "-8px",
            },
          },
        }}
        icon={
          <SpeedDialIcon
            icon={<EmojiEmotionsRoundedIcon />}
            openIcon={<SentimentVerySatisfiedRoundedIcon />}
          />
        }
      />
    </Tooltip>
  );
};

export default ChatBotButton;
