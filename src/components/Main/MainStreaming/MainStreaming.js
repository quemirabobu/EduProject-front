import { Paper } from "@mui/material";
import MainStreamingTitle from "./MainStreamingTitle";
import MainStreamingArea from "./MainStreamingArea";

const streamingContainer = {
  borderRadius: "0px",
  position: "relative",
  width: "100vw",
  height: "100vh",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#171A2B",
};

const MainStreaming = ({ Thumnail }) => {
  return (
    <Paper className="streamingContainer" elevation={0} sx={streamingContainer}>
      <MainStreamingTitle />
      <MainStreamingArea Thumnail={Thumnail} />
    </Paper>
  );
};

export default MainStreaming;
