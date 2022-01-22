import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import Layout from "../component/Layout";
import delStyles from "./css/delete.module.css";
import { postToJSON, firestore } from "../lib/firebase";
import Image from "next/image";
import { useRouter } from "next/router";

//
export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("users");
  // .where('published', '==', true)
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  // console.log(posts);
  return {
    props: { posts }, // will be passed to the page component as props
  };
}
function DeleteUser(props) {
  const router = useRouter();
  const [posts, setPosts] = useState(props.posts);
  const usersClient = posts.filter((users) => {
    return users;
    // .isClient.toLowerCase().includes("false");
  });
  const removeUser = (e) => {
    try {
      firestore
        .collection("users")
        .doc(e)
        .delete()
        .then(alert("This User is now deleted"));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <div>
      <div className={delStyles.deleteContainer}>
        <Paper style={{ maxHeight: 700, overflow: "auto" }}>
          <Grid container spacing={1}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h4">Image</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h4">Name</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h4">Email</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h4">Role</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h4">Status</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h4">Actions</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersClient.map((users) => (
                    <TableRow key={users.id}>
                      <TableCell>
                        <img
                          component="img"
                          src={
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          }
                          height={40}
                          width={40}
                          alt={users.username}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography>{users.fullname}</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography>{users.email}</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography>{users.jobdescription}</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography>{users.status}</Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeUser(users.id)}
                        >
                          Remove User
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default DeleteUser;
