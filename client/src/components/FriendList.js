import { List, ListItem, ListItemText, Button } from "@mui/material";

const FriendList = ({ friends, handleRemoveFriend }) => {
      return (
            <List>
                  {friends.map((friend) => (
                        <ListItem key={friend.id}>
                              <ListItemText primary={friend.username} secondary={friend.email} />
                              <Button variant="contained" color="error" onClick={() => handleRemoveFriend(friend.id)}>
                                    Remove
                              </Button>
                        </ListItem>
                  ))}
            </List>
      );
};

export default FriendList;
