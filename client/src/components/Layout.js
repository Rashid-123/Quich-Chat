import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container, Box } from "@mui/material";

const Layout = ({ children }) => {
      return (
            <Box>
                  <Navbar />
                  <Container component="main" sx={{ minHeight: "80vh", mt: 4 }}>
                        {children}
                  </Container>
                  <Footer />
            </Box>
      );
};

export default Layout;
