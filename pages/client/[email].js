import React, { useState, useContext } from "react";
import Layout from "../../component/Layout";
import { postToJSON, firestore } from "../../lib/firebase";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  Link,
  Paper,
  Table,
  TableCell,
  Typography,
} from "@material-ui/core";
import slugStyles from "./slug.module.css";
import { Container, Grid, TableRow } from "@mui/material";

//

export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("users");
  const postsQuery2 = firestore.collectionGroup("posts");
  // .where('published', '==', true)
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  const posts2 = (await postsQuery2.get()).docs.map(postToJSON);

  // console.log(posts);
  return {
    props: { posts, posts2 }, // will be passed to the page component as props
  };
}

function UserProfile(props) {
  const [posts, setPosts] = useState(props.posts);

  const [posts2, setPosts2] = useState(props.posts2);
  const router = useRouter();
  const { email } = router.query;

  const usersClient = posts.filter((users) => {
    return users.email.toLowerCase().includes(email);
  });

  const usersClient2 = posts2.filter((posts) => {
    return posts.poster_id.includes(usersClient[0].id);
  });

  const profile = usersClient.find((users) => users.email === email);

  if (!profile) {
    return <div>User not found</div>;
  }
  // const postMessage = usersClient2.find((posts) => posts.msg === profile);
  // if (!postMessage) {
  //   return <div> Client has not posted yet</div>;
  // }

  return (
    <Layout>
      <div className={slugStyles.slugContainer}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <Card align="center" style={{ borderStyle: "solid" }}>
              <CardContent>
                <img
                  component="img"
                  // src={profile.imageUrl}
                  src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  height={250}
                  width={350}
                  alt={profile.fullname}
                />
                <Typography variant="h4">Name</Typography>
                <Typography variant="h4">
                  <u>
                    <strong>{profile.fullname}</strong>
                  </u>
                </Typography>
                <Typography variant="h4">Address</Typography>
                <Typography variant="h4">
                  <u>{profile.address}</u>
                </Typography>
                <Typography variant="h4">Gender</Typography>
                <Typography variant="h4">
                  {" "}
                  <u>{profile.gender}</u>
                </Typography>
                <Typography variant="h4">Contact Number</Typography>
                <Typography variant="h4">
                  <u>{profile.phoneNumber}</u>
                </Typography>
                <Typography variant="h4">Role</Typography>
                <Typography variant="h4">
                  <u>
                    <strong>{profile.jobdescription}</strong>
                  </u>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={8}>
            <Card sx={{ border: 1 }} style={{ borderStyle: "solid" }}>
              <Typography variant="h4">Proof of Valid ID's</Typography>
              <Container
                style={{
                  minWidth: 300,
                  maxWidth: 300,
                  minHeight: 290,
                  maxHeight: 290,
                  overflow: "hidden",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <img
                      component="img"
                      src={profile.validID}
                      height={290}
                      width={300}
                      alt={profile.fullname}
                    />
                  </Grid>
                  {/* <Grid item xs={6}>
                    <img
                      component="img"
                      src={profile.validID2}
                      height={290}
                      width={300}
                      alt={profile.fullname}
                    />
                  </Grid> */}
                </Grid>
              </Container>
            </Card>
            <Grid item xs={12}>
              <Paper style={{ maxHeight: 290, overflow: "auto" }}>
                <Card style={{ borderStyle: "solid" }}>
                  <Typography variant="h4">Post History</Typography>
                  {/* <Container
                  style={{
                    minWidth: 300,
                    maxWidth: 300,
                    minHeight: 290,
                    maxHeight: 290,
                    overflow: "hidden",
                  }}
                > */}
                  <Table>
                    <TableRow>
                      <img
                        component="img"
                        // src={profile.imageUrl}
                        src={
                          "https://images.unsplash.com/photo-1622151834625-66296f9f0e96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwd29ya2luZ3xlbnwwfHwwfHw%3D&w=1000&q=80"
                        }
            
                        height={100}
                        width={100}
                        alt={profile.fullname}
                        
                      />
                      {!usersClient2[0] ? (
                        <TableCell>NO POST YET</TableCell>
                      ) : (
                        <TableCell>
                          <Typography><strong>{usersClient2[0].name}</strong></Typography>
                          <Typography>{usersClient2[0].msg}</Typography>
                        </TableCell>
                      )}
                    </TableRow>
                  </Table>
                  {/* </Container> */}
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export default UserProfile;
