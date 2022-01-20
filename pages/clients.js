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
import clientStyles from "./css/client.module.css";
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

export default function Clients(props) {
  // const {user} =useContext(UserContext);
  // if(!user.jobdescription = "Admin"){
  //   router.push("/")
  // }
  const [posts, setPosts] = useState(props.posts);

  const usersClient = posts.filter((users) => {
    return users.jobdescription.toLowerCase().includes("client");
  });
  // console.log(usersClient);

  // const handleChange = (e, props) => {
  //   {
  //     search: e.target.usersClient;
  //   }
  //   () => {
  //     if (search && search.length >= 1) {
  //       getResults(ownProps);
  //     }
  //   };
  // };
  // const getResults = (ownProps) => {
  //   const filteredClient = ownProps.filter((users) => {
  //     return users.fullname.toLowerCase().includes(search.toLowerCase());
  //   });
  // };
  return (
    <Layout title="Clients">
      <div>
        <div>
          <input
            className={clientStyles.search}
            type="search"
            placeholder="Search Client Here"
            onChange={(e) => handleChange(e, usersClient)}
          />
        </div>
        <div className={clientStyles.clientContainer}>
          <Paper style={{ maxHeight: 700, overflow: "auto" }}>
            <Card>
              {usersClient.map((users) => (
                <CardActionArea>
                  <CardContent sx={{ display: "flex" }}>
                    <NextLink href={`./client/${users.email}`}>
                      <Table>
                        <TableCell>
                          <img
                            component="img"
                            image={users.imageUrl}
                            height={200}
                            width={300}
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
      </div>
    </Layout>
  );
}
