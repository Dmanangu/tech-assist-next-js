import {
  Box,
  Card,
  List,
  ListItem,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import React, { useContext, useRef } from "react";
import useStyles from "../utils/styles";
import { useUserContext } from "../lib/userContext";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Layout from "../component/Layout";
import { Input } from "@mui/material";

//

const Login = () => {
  const classes = useStyles();
  const router = useRouter();

  const emailRef = useRef();
  const psdRef = useRef();
  const { signInUser } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = psdRef.current.value;
    if (email && password) {
      signInUser(email, password);
      alert("Login Successful");
      router.push("/clients");
    } else {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <div title="Login">
      <form onSubmit={onSubmit}>
        <Card className={classes.loginCard}>
          <List>
            <ListItem>
              <Typography>EMAIL:&emsp;&emsp;&ensp;</Typography>
              <input
                variant="outlined"
                fullWidth
                id="email"
                label="EMAIL"
                type="email"
                ref={emailRef}
                inputProps={{ type: "email" }}
              ></input>
            </ListItem>
            <ListItem>
              <Typography>PASSWORD:</Typography>
              <input
                variant="outlined"
                fullWidth
                id="password"
                label="PASSWORD"
                type="password"
                ref={psdRef}
                inputProps={{ type: "password" }}
              ></input>
            </ListItem>
            <ListItem>
              <Button
                className={classes.color}
                fullWidth
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </ListItem>
            <ListItem>
              <NextLink href={"/register"} passHref>
                <Typography>
                  <Link>Does not have an Admin account? Register?</Link>
                </Typography>
              </NextLink>
            </ListItem>
          </List>
        </Card>
      </form>
    </div>
  );
};
export default Login;
