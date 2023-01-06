import Copyright from "../Copyright";
import { Box, Container, Typography } from "@mui/material";

function Footer(props) {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: "auto",
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm" sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <img src="/logo.png" alt="logo" style={{ width: "80px", height: "80px" }}></img>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <Typography variant="body1">Đồ án cuối kỳ.</Typography>
                    <Copyright />
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
