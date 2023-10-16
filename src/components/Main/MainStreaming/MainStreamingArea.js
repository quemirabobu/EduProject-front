import { Paper } from "@mui/material";

const StreamingArea = ({ Thumnail }) => {
  return (
    <Paper
      className="whiteBox"
      elevation={0}
      sx={{
        position: "absolute",
        bottom: 0,
        width: "90vw",
        height: "80vh",
        backgroundColor: "#f2f2f2",
        borderRadius: "30px 30px 0px 0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Thumnail ? (
        <img
          style={{
            width: "50vw",
            height: "60vh",
          }}
          src={Thumnail}
        ></img>
      ) : (
        <>
          <Paper
            className="streamingBox"
            sx={{
              width: "50vw",
              height: "60vh",
              backgroundColor: "#323232",
              borderRadius: "0px",
            }}
          ></Paper>
        </>
      )}
    </Paper>
  );
};

export default StreamingArea;
