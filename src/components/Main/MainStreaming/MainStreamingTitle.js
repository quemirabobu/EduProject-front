import { Link } from "react-router-dom";
import Title from "../../Title";
import { Box, Button } from "@mui/material";

const StreamingTitle = () => {
  return (
    <Box sx={{ position: "absolute", left: "80px", top: "40px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Title
          subtitle="스트리밍"
          title="Live 수업"
          color="#ffffff"
          width="210px"
        />
        <Link to="/streaming">
          <Button
            variant="contained"
            type="button"
            style={{
              color: "#323232",
              background: "white",
              border: "0px",
              borderRadius: "10px",
              height: "40px",
              width: "95px",
              marginTop: "25px",
            }}
          >
            참관하기
          </Button>
        </Link>
      </div>
    </Box>
  );
};
export default StreamingTitle;
