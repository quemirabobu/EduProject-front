import Box from "@mui/material/Box";

const messageBox = {
  position: "relative",
  backgroundColor: "#f2f2f2",
  width: "1000px",
  height: "110px",
  left: "20vw",
  borderRadius: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "0 20px",
  margin: "0 0 30px 0",
};

const messageBoxDeco = {
  position: "absolute",
  left: "30px",
  backgroundColor: "#5ac467",
  borderRadius: "50%",
  width: "70px",
  height: "70px",
};

const MessengerContainer = ({ message }) => {
  return (
    <Box
      data-aos="fade-left"
      data-aos-easing="ease-in"
      data-aos-duration="2000"
      data-aos-offset="200"
      data-aos-delay="500"
      data-aos-anchor="#fade-left"
      className="messageBox"
      sx={messageBox}
    >
      <div className="messageBoxDeco" style={messageBoxDeco} />
      <p
        style={{
          color: "black",
          position: "relative",
          left: "110px",
          width: "50vw",
          fontSize: "20px",
        }}
      >
        <span>
          <b>{message.sender.name}</b>:
        </span>
        <span style={{ marginLeft: "20px" }}>{message.content}</span>
      </p>
    </Box>
  );
};

export default MessengerContainer;
