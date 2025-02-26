import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
      const { user, logout } = useAuth();

      return (
            <AppBar position="static" color="primary">
                  <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                              QuickChat
                        </Typography>

                        {user ? (
                              <>
                                    <Button color="inherit" component={Link} href="/friends">
                                          Friends
                                    </Button>
                                    <Button color="inherit" component={Link} href="/requests">
                                          Requests
                                    </Button>
                                    <Button color="inherit" component={Link} href="/profile">
                                          Profile
                                    </Button>
                                    <Button color="inherit" onClick={logout}>
                                          Logout
                                    </Button>
                              </>
                        ) : (
                              <>
                                    <Button color="inherit" component={Link} href="/login">
                                          Login
                                    </Button>
                                    <Button color="inherit" component={Link} href="/register">
                                          Register
                                    </Button>
                              </>
                        )}
                  </Toolbar>
            </AppBar>
      );
};

export default Navbar;
