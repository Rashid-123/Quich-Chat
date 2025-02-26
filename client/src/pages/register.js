import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

export default function Register() {
      const [form, setForm] = useState({ username: "", email: "", password: "" });

      const handleRegister = async () => {
            // TODO: Implement registration API call
            console.log("Register API call", form);
      };

      return (
            <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
                  <Typography variant="h4" gutterBottom>Register</Typography>
                  <TextField fullWidth label="Username" variant="outlined" sx={{ mb: 2 }} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                  <TextField fullWidth label="Email" variant="outlined" sx={{ mb: 2 }} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <TextField fullWidth type="password" label="Password" variant="outlined" sx={{ mb: 2 }} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                  <Button variant="contained" fullWidth onClick={handleRegister}>Register</Button>
            </Container>
      );
}
