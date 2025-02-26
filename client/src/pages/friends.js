import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import FriendList from "../components/friendList";

export default function Friends() {
      const [friends, setFriends] = useState([]);

      useEffect(() => {
            const fetchFriends = async () => {
                  // TODO: Fetch friends list from API
                  console.log("Fetching friends...");
            };
            fetchFriends();
      }, []);

      const handleRemoveFriend = async (friendId) => {
            // TODO: Remove friend API call
            console.log(`Removing friend: ${friendId}`);
      };

      return (
            <Container maxWidth="md">
                  <Typography variant="h4" gutterBottom>My Friends</Typography>
                  <FriendList friends={friends} handleRemoveFriend={handleRemoveFriend} />
            </Container>
      );
}
