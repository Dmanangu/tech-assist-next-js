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
    <div>
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
                  minWidth: 300,
                  maxWidth: 300,
                  minHeight: 290,
                  maxHeight: 290,
                  overflow: "hidden",
                }}
              >
                <img
                  component="img"
                  src={profile.validID}
                  height={290}
                  width={300}
                  alt={profile.fullname}
                />
              </Container>
            </Card>
            <Grid item xs={12}>
              <Card>
                <Typography variant="h4">Proof as a Worker</Typography>
                <Container
                  style={{
                    minWidth: 300,
                    maxWidth: 300,
                    minHeight: 290,
                    maxHeight: 290,
                    overflow: "hidden",
                  }}
                >
                  <img
                    component="img"
                    src={profile.jobdescription}
                    height={280}
                    width={300}
                    alt={profile.fullname}
                  />
                </Container>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default UserProfile;
