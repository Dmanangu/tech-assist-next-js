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
        <Card align="center">
          <CardContent>
            <img
              component="img"
              src={profile.imageUrl}
              // src={
              //   "https://images.unsplash.com/photo-1622151834625-66296f9f0e96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwd29ya2luZ3xlbnwwfHwwfHw%3D&w=1000&q=80"
              // }
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
      </div>
    </Layout>
  );
}

export default UserProfile;
