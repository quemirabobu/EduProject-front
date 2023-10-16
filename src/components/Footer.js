import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import { grey } from "@mui/material/colors";

const Footer = () => (
  <>
    <Box
      component="footer"
      sx={{
        py: 6, // padding on y-axis increased
        px: 2,
        mt: "auto",
        backgroundColor: "#4A4F6B",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" color={grey[300]}>
            © 2023 EduVenture
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <MuiLink href="#" variant="body1" color={grey[300]} underline="hover">
            개인정보 처리방침
          </MuiLink>
          <MuiLink href="#" variant="body1" color={grey[300]} underline="hover">
            이용약관
          </MuiLink>
          <MuiLink href="#" variant="body1" color={grey[300]} underline="hover">
            고객센터
          </MuiLink>
        </Box>
      </Container>
    </Box>
  </>
);

export default Footer;
