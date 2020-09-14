import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/core';

import { gql, useQuery, useMutation } from '@apollo/client';

const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
    }
  }
`

const DELETE_USER = gql`
  mutation deleteUser ($id: String!) {
    deleteUser(id: $id)
  }
`;

const DeleteUser = () => {
  
  const { loading: queryLoading, error: queryError, data } = useQuery(GET_USERS);

  const updateCache = (cache, { data }) => {
    // Fetch the users from the cache
    const existingUsers = cache.readQuery({
      query: GET_USERS
    });
    // Generate an array without the deleted user and update cache
    const newUsers = existingUsers.users.filter(user => user.id !== data.deleteUser);
    cache.writeQuery({
      query: GET_USERS,
      data: {users: [...newUsers]}
    });
  };

  const [ 
    deleteUser,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(DELETE_USER, { update: updateCache });

  function deleteMe(user) {
    deleteUser({variables: { id: user.id }});
  }

  if(queryLoading) return <Spinner alignSelf="center" size="48px" />;
  if(queryError) return <Text alignSelf="center">There was an error fetching the users 😭</Text>;
  if(!data.users.length) return <Heading alignSelf="center">Sorry, no users :(</Heading>;

  return (
    <Box alignSelf="center">
      {
        data.users.map(user => (
          <Stack key={user.id}>
            <Link p={5} onClick={() => deleteMe(user)}>
              <Flex p={5} shadow="md" borderWidth="1px" borderRadius={4}>
                <Heading fontSize="lg">{user.name}</Heading>
                <Icon ml={2} name="delete" size="24px" color="red.500"/>
              </Flex>
            </Link>
          </Stack>
        ))
      }
      {mutationLoading && <Spinner size="24px" />}
      {mutationError && <Text>Error :( Please try again</Text>}
    </Box>    
  );
}

export default DeleteUser;