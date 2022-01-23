import React, { useState, useContext } from "react";
import Layout from "../../component/Layout";
import { postToJSON, firestore } from "../../lib/firebase";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableCell,
  Typography,
  Divider,
} from "@material-ui/core";
import { Container } from "@material-ui/core";
import slugStyles from "./slug.module.css";

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

function UserProfile(props) {
  const [posts, setPosts] = useState(props.posts);
  const router = useRouter();
  const { email } = router.query;

  const usersClient = posts.filter((users) => {
    return users.email.toLowerCase().includes(email);
  });

  const profile = usersClient.find((users) => users.email === email);

  if (!profile) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <div className={slugStyles.slugContainer}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <Card>
              <CardContent align="center">
                <img
                  component="img"
                  // image={profile.imageUrl}
                  src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  height={200}
                  width={200}
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
                <Typography variant="h4">Specialization</Typography>
                <Typography variant="h4">
                  <u>
                    <strong>{profile.jobdescription}</strong>
                  </u>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card sx={{ border: 1 }}>
              <Typography variant="h4">Proof of Valid ID's</Typography>
              <Container
                style={{
                  minWidth: 700,
                  maxWidth: 700,
                  minHeight: 290,
                  maxHeight: 290,
                  // overflow: "hidden",
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
                  <Grid item xs={6}>
                    <img
                      src={profile.validID2}
                      height={290}
                      width={300}
                      alt={profile.fullname}
                    />
                  </Grid>
                </Grid>
              </Container>
            </Card>
            <Grid item xs={12}>
              <Card>
                <Typography variant="h4">Proof as a Worker</Typography>
                <Container
                  style={{
                    minWidth: 1000,
                    maxWidth: 1200,
                    minHeight: 310,
                    maxHeight: 310,
                    //   overflow: "hidden",
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <img
                        component="img"
                        src={profile.validID3}
                        height={280}
                        width={300}
                        alt={profile.fullname}
                        margin={3}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <img
                        component="img"
                        src={profile.validID4}
                        height={280}
                        width={300}
                        alt={profile.fullname}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <img
                        component="img"
                        src={profile.validID5}
                        height={280}
                        width={300}
                        alt={profile.fullname}
                      />
                    </Grid>
                  </Grid>
                </Container>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export default UserProfile;
