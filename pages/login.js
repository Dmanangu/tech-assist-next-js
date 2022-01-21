import {
  Box,
  Card,
  List,
  ListItem,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import React, { useContext, useRef } from "react";
import useStyles from "../utils/styles";
import { useUserContext } from "../lib/userContext";
import { useRouter } from "next/router";

export default function Login() {
  const classes = useStyles();
  const router = useRouter();

  const emailRef = useRef();
  const psdRef = useRef();
  const { user, signInUser } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = psdRef.current.value;
    if (email && password) {
      signInUser(email, password);
      alert("Login Successful");
      router.push("/clients");
    } else {
      alert("Login an Admin Account");
    }
  };

  return (
    <div title="Login">
      <form onSubmit={onSubmit}>
        <Card className={classes.loginCard}>
          <List>
            <ListItem>
              <Typography>USERNAME:</Typography>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="USERNAME"
                type="email"
                ref={emailRef}
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
                type="password"
                ref={psdRef}
                inputProps={{ type: "password" }}
              ></TextField>
            </ListItem>
            <ListItem>
              <Button
                className={classes.color}
                fullWidth
                variant="contained"
                type="submit"
                // onClick={handleSubmit}
              >
                Login
              </Button>
            </ListItem>
          </List>
        </Card>
      </form>
    </div>
  );
}
