import {
  Box,
  Card,
  List,
  ListItem,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import useStyles from "../utils/styles";
import { UserContext } from "../lib/context";
import { useRouter } from "next/router";

export default function Login() {
  const classes = useStyles();
  const router = useRouter();

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
