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
  const [filteredPosts, setFilteredPosts] = useState(props.posts);

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
      router.push("/delete");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const filterSearch = ({ usersClient }) => {
    const path = router.pathname;
    const { query } = router;
    if (usersClient.users) query.usersClient.users = usersClient.users;
  };

  const clientSearchHandler = (e) => {
    const searchClient = filteredPosts;

    if (e.target.value.length >= 0 && e.target.value === "") {
      setPosts(filteredPosts);
    } else {
      const filter = usersClient.filter((users) => {
        return users.fullname.toLowerCase().includes(e.target.value);
      });
      setPosts(filter);
    }
  };
  return (
    <Layout>
      <input
        style={{ marginTop: 20, width: 600 }}
        type="search"
        placeholder="Search User Here"
        value={usersClient.users}
        onChange={clientSearchHandler}
      />
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
    </Layout>
  );
}

export default DeleteUser;
