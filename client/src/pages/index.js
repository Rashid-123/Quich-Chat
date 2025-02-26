import { useState } from "react";
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, CircularProgress } from "@mui/material";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(`/api/search?query=${query}`);
      setUsers(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleSendRequest = async (userId) => {
    // Implement friend request sending logic here
    alert(`Friend request sent to ${userId}`);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      {/* Hero Section */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome to QuickChat
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Find friends and start chatting now!
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search for friends..."
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      {/* Loading Indicator */}
      {loading && <CircularProgress sx={{ mt: 2 }} />}

      {/* Error Message */}
      {error && <Typography color="error">{error}</Typography>}

      {/* User List */}
      <List sx={{ mt: 3 }}>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.username} secondary={user.email} />
            <ListItemSecondaryAction>
              <Button variant="outlined" color="secondary" onClick={() => handleSendRequest(user.id)}>
                Send Request
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
