import React from 'react';
import { Box, Heading, Spinner, Text } from '@chakra-ui/core';
import UserItem from './UserItem';

import { gql, useQuery } from '@apollo/client';

// We first define the query, we can test it before with the 
// GraphQL playground if we have access or with the Apollo Extension
// in the browser, for now we query everything but we refine it later
const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
    }
  }
`

const Users = () => {
  // Using the useQuery hook that provides us with different status of
  // our query, kind of like a state machine
  const { loading, error, data } = useQuery(GET_USERS);

  if(loading) return <Spinner alignSelf="center" size="48px" />;
  if(error) return <Text alignSelf="center">There was an error fetching the users 😭</Text>;
  if(!data.users.length) return <Heading alignSelf="center">Sorry, no users :(</Heading>;
  
  return (
    <Box alignSelf="center">
      {
        data.users.map(user => <UserItem key={user.id} user={user} />)
      }
    </Box>
  );
}

export default Users;