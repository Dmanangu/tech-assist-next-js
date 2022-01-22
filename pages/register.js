import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  TextField,
} from "@mui/material";
import React, { useRef } from "react";
import { useUserContext } from "../lib/userContext";
import useStyles from "../utils/styles";
import Layout from "../component/Layout";
import NextLink from "next/link";

const Signup = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const nameRef = useRef();
  const psdRef = useRef();
  const { registerUser } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const fullname = nameRef.current.value;
    const password = psdRef.current.value;
    if (email && password && fullname) {
      registerUser(email, password, fullname);
      alert("Admin created");
    } else {
      alert("Failed to create an account");
    }
  };

  return (
    <Layout>
      <Card className={classes.registerCard} align="center">
        <CardContent>
          <h2> Create Admin User</h2>
        </CardContent>
        <form onSubmit={onSubmit}>
          <CardContent>
            <input placeholder="Email" type="email" ref={emailRef} />
          </CardContent>
          <CardContent>
            <input placeholder="Name" type="name" ref={nameRef} />
          </CardContent>
          <CardContent>
            <input placeholder="Password" type="password" ref={psdRef} />
          </CardContent>
          <CardContent>
            <Button type="submit" variant="contained">
              Register
            </Button>
          </CardContent>
          <CardActionArea>
            <NextLink href={"/"} passHref>
              <h3>Already have an account? Login</h3>
            </NextLink>
          </CardActionArea>
        </form>
      </Card>
    </Layout>
  );
};

export default Signup;
