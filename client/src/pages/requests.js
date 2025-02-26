import { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import axios from "axios";

export default function Requests() {
      const [requests, setRequests] = useState([]);

      useEffect(() => {
            const fetchRequests = async () => {
                  // TODO: Fetch friend requests from API
                  console.log("Fetching friend requests...");
            };
            fetchRequests();
      }, []);

      const handleAccept = async (requestId) => {
            // TODO: Accept request API call
            console.log(`Accepting request: ${requestId}`);
      };

      const handleReject = async (requestId) => {
            // TODO: Reject request API call
            console.log(`Rejecting request: ${requestId}`);
      };

      return (
            <Container maxWidth="md">
                  <Typography variant="h4" gutterBottom>Friend Requests</Typography>
                  <List>
                        {requests.map((request) => (
                              <ListItem key={request.id}>
                                    <ListItemText primary={request.username} />
                                    <Button onClick={() => handleAccept(request.id)}>Accept</Button>
                                    <Button color="error" onClick={() => handleReject(request.id)}>Reject</Button>
                              </ListItem>
                        ))}
                  </List>
            </Container>
      );
}
