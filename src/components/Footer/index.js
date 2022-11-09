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
            <Container maxWidth="sm">
                <Typography variant="body1">Đồ án cuối kỳ.</Typography>
                <Copyright />
            </Container>
        </Box>
    );
}

export default Footer;
