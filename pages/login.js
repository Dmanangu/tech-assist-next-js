import {
  Box,
  List,
  ListItem,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";
import useStyles from "../utils/styles";

function Login() {
  const classes = useStyles();
  return (
    // class="flex flex-col justify-center items-center"
    <div title="Login">
      <form>
        <Box
          marginTop={35}
          sx={{
            width: 700,
            height: 250,
            backgroundColor: "#e3dddd",
            opacity: [0.7],
            borderRadius: 20,
          }}
        >
          <List>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="email"
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                label="password"
              ></TextField>
            </ListItem>
            <ListItem>
              <Button className={classes.color} fullWidth variant="contained">
                Login
              </Button>
            </ListItem>
          </List>
        </Box>
      </form>
    </div>
  );
}

export default Login;
