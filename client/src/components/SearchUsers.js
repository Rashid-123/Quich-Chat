import { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import axios from "axios";

const SearchUser = ({ handleSendRequest }) => {
      const [query, setQuery] = useState("");
      const [users, setUsers] = useState([]);

      const handleSearch = async () => {
            if (!query) return;
            try {
                  const { data } = await axios.get(`/api/search?query=${query}`);
                  setUsers(data);
            } catch (err) {
                  console.error("Error fetching users", err);
            }
      };

      return (
            <>
                  <TextField
                        label="Search for friends..."
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                  />
                  <Button variant="contained" onClick={handleSearch}>
                        Search
                  </Button>

                  <List sx={{ mt: 3 }}>
                        {users.map((user) => (
                              <ListItem key={user.id}>
                                    <ListItemText primary={user.username} secondary={user.email} />
                                    <ListItemSecondaryAction>
                                          <Button variant="outlined" onClick={() => handleSendRequest(user.id)}>
                                                Send Request
                                          </Button>
                                    </ListItemSecondaryAction>
                              </ListItem>
                        ))}
                  </List>
            </>
      );
};

export default SearchUser;
