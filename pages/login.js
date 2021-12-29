import {
  Box,
  Card,
  List,
  ListItem,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "../utils/styles";

export default function Login() {
  const classes = useStyles();
  return (
    <div title="Login">
      <form>
        <Card className={classes.loginCard}>
          <List>
            <ListItem>
              <Typography>USERNAME:</Typography>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="USERNAME"
                inputProps={{ type: "email" }}
              ></TextField>
            </ListItem>
            <ListItem>
              <Typography>PASSWORD:</Typography>
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                label="PASSWORD"
                inputProps={{ type: "password" }}
              ></TextField>
            </ListItem>
            <ListItem>
              <Button className={classes.color} fullWidth variant="contained">
                Login
              </Button>
            </ListItem>
          </List>
        </Card>
      </form>
    </div>
  );
}
