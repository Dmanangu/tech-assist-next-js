import {
  Card,
  Divider,
  Link,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import Layout from "../component/Layout";
import NextLink from "next/link";
import useStyles from "../utils/styles";
import supportStyles from "./css/support.module.css";

import { useState, useEffect } from "react";

import { NavLink } from ".";
import { userService } from "services";

export default function Support() {
  const classes = useStyles();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
  }

  // only show nav when logged in
  if (!user) return null;

  return (
    <Layout>
      <div className={supportStyles.supportContainer}>
        <Card className={classes.supportCard}>
          <MenuList dense>
            <Typography variant="h2" className={classes.center}>
              SETTINGS
            </Typography>
            <Divider />
            <MenuItem>
              <Typography variant="h4" style={{ marginLeft: 10 }}>
                ACCOUNT SETTINGS
              </Typography>
            </MenuItem>
            <MenuItem>
              <NextLink href={"/delete"} passHref>
                <Typography variant="h4" style={{ marginLeft: 10 }}>
                  DELETE
                </Typography>
              </NextLink>
            </MenuItem>
            <MenuItem>
              <NextLink href={"/update"} passHref>
                <Typography variant="h4" style={{ marginLeft: 10 }}>
                  UPDATE
                </Typography>
              </NextLink>
            </MenuItem>
            <MenuItem>
              <a onClick={logout} className="nav-item nav-link">
                <Typography variant="h4">LOGOUT</Typography>
              </a>
            </MenuItem>
          </MenuList>
        </Card>
      </div>
    </Layout>
  );
}
