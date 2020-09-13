import React, { useState, useEffect } from 'react'
import { 
  Link as RRLink,
  useParams
} from "react-router-dom";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Link,
  List,
  ListItem,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/core';

const wait = (cb) => (setTimeout(cb, 2000));

const User = () => {
  let { id } = useParams();

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.SERVER_URL}/users/${id}`)
      .then(data => data.json())
      .then(data => {
        wait(() => {
          setUser(data);
          setIsLoading(false);
        })
      })
      .catch(err => console.log(err));
  }, []);

  if(isLoading) return <Spinner alignSelf="center" size="48px" />;
  if(!user) return <p>Sorry, there was a problem loading the user :(</p>;

  return (
  <>
    <Box alignSelf="center">
      <Stack key={user.id}>
        <Flex direction="column" textAlign="center" p={5} shadow="md" borderWidth="1px" borderRadius={4}>
          <Link p={5} as={RRLink} to="/users">
            <Heading fontSize="lg">id: {user.id}</Heading>
          </Link>
          <Heading my={3} fontSize="xl">{user.name}</Heading>
          <Text>{user.address}</Text>
          <Text my={3} fontSize="xs">{user.birthday}</Text>
          <Divider />
          Posts:
          <List styleType="disc" listStylePosition="inside">
            {
              user.posts && user.posts.length > 0
              ? user.posts.map(post => <ListItem my={1} key={post.title}>{post.title}</ListItem>)
              : <Text>This user has no posts</Text>
            }
          </List>
        </Flex>
      </Stack>
    </Box>
  </>
  );
}

export default User;