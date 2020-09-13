import React from 'react'
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

import { gql, useQuery } from '@apollo/client';

const GET_USER_BY_ID = gql`
  query getUser($id: String!) {
    user(id: $id) {
      id
      name
      address
      birthday
      posts {
        id
      }
    }
  }
`

const User = () => {
  let { id } = useParams();

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id }
  });

  if(loading) return <Spinner alignSelf="center" size="48px" />;
  if(error) return <Text alignSelf="center">There was an error fetching the user 😭</Text>;
  if(!data.user) return <p>Sorry, there was a problem loading the user :(</p>;

  return (
  <>
    <Box alignSelf="center">
      <Stack key={data.user.id}>
        <Flex direction="column" textAlign="center" p={5} shadow="md" borderWidth="1px" borderRadius={4}>
          <Link p={5} as={RRLink} to="/users">
            <Heading fontSize="lg">id: {data.user.id}</Heading>
          </Link>
          <Heading my={3} fontSize="xl">{data.user.name}</Heading>
          <Text>{data.user.address}</Text>
          <Text my={3} fontSize="xs">{data.user.birthday}</Text>
          <Divider />
          Posts:
          <List styleType="disc" listStylePosition="inside">
            {
              data.user.posts && data.user.posts.length > 0
              ? data.user.posts.map(post => <ListItem my={1} key={post.title}>{post.title}</ListItem>)
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