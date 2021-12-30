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
export default function Support() {
  const classes = useStyles();
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
              <NextLink href={"/profile"} passHref>
                <Typography variant="h4">ACCOUNT SETTINGS</Typography>
              </NextLink>
            </MenuItem>
            <MenuItem>
              <NextLink href={"/delete"} passHref>
                <Typography variant="h4">DELETE</Typography>
              </NextLink>
            </MenuItem>
            <MenuItem>
              <NextLink href={"/update"} passHref>
                <Typography variant="h4">UPDATE</Typography>
              </NextLink>
            </MenuItem>
            <MenuItem>
              <NextLink href={"/"} passHref>
                <Link>
                  <Typography variant="h4">LOGOUT</Typography>
                </Link>
              </NextLink>
            </MenuItem>
          </MenuList>
        </Card>
      </div>
    </Layout>
  );
}
