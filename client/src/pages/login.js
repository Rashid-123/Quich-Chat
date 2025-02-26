import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

export default function Login() {
      const [form, setForm] = useState({ email: "", password: "" });

      const handleLogin = async () => {
            // TODO: Implement login API call
            console.log("Login API call", form);
      };

      return (
            <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
                  <Typography variant="h4" gutterBottom>Login</Typography>
                  <TextField fullWidth label="Email" variant="outlined" sx={{ mb: 2 }} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <TextField fullWidth type="password" label="Password" variant="outlined" sx={{ mb: 2 }} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                  <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
            </Container>
      );
}
