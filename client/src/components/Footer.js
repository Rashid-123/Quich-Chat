import { Box, Typography } from "@mui/material";

const Footer = () => {
      return (
            <Box component="footer" sx={{ textAlign: "center", p: 2, mt: 4, bgcolor: "primary.main", color: "white" }}>
                  <Typography variant="body2">
                        &copy; {new Date().getFullYear()} ChatApp. All rights reserved.
                  </Typography>
            </Box>
      );
};

export default Footer;
