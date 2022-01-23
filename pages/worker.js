import {
  Box,
  Card,
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
  Paper,
  Table,
  TableRow,
  TableCell,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import Layout from "../component/Layout";
import workerStyles from "./css/worker.module.css";
import { postToJSON, firestore } from "../lib/firebase";
import Image from "next/image";
import NextLink from "next/link";
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

export default function Worker(props) {
  const [posts, setPosts] = useState(props.posts);
  const [filteredPosts, setFilteredPosts] = useState(props.posts);

  const usersClient = posts.filter((users) => {
    return users.isClient.toLowerCase().includes("false");
  });

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
    <Layout title="Worker">
      <div>
        <input
          className={workerStyles.search}
          type="search"
          placeholder="Search Worker Here"
          value={usersClient.users}
          onChange={clientSearchHandler}
        />
      </div>
      <div className={workerStyles.workerContainer}>
        <Paper style={{ maxHeight: 700, overflow: "auto" }}>
          <Card>
            {usersClient.map((users) => (
              <CardActionArea>
                <CardContent sx={{ display: "flex" }}>
                  <NextLink href={`./worker/${users.email}`}>
                    <Table>
                      <TableCell>
                        <img
                          component="img"
                          src={
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          }
                          height={200}
                          width={250}
                          alt={users.fullname}
                          align="left"
                        />
                        <Typography variant="h3">
                          <strong>{users.fullname}</strong>
                        </Typography>
                        <Typography variant="h4">{users.address}</Typography>
                        <Typography variant="h4">
                          {users.phoneNumber}
                        </Typography>
                        <Typography variant="h4">{users.username}</Typography>
                      </TableCell>
                    </Table>
                  </NextLink>
                </CardContent>
              </CardActionArea>
            ))}
          </Card>
        </Paper>
      </div>
    </Layout>
  );
}
