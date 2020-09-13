import React, { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Stack,
  useToast
} from '@chakra-ui/core';

const wait = (cb) => (setTimeout(cb, 2000));

const DeleteUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  
  function getUsers() {
    fetch(`${process.env.SERVER_URL}/users`)
    .then(data => data.json())
    .then(data => {
      setUsers(data);
      setIsLoading(false);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    wait(() => {
      getUsers();
    })
  }, []);

  function deleteMe(user) {
    console.log(user);
    setIsLoading(true);
    wait(() => {
      fetch(`${process.env.SERVER_URL}/users/${user.id}`,{
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
      .then(data => {
        console.log(data);
        toast({
          position: "bottom-left",
          title: `User ${user.name} deleted successfully.`,
          description: "They sure deserved it.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getUsers();
      })
      .catch(err => {
        console.log(err);
        toast({
          position: "bottom-left",
          title: "There was an error.",
          description: "Oh no.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
    })
  }

  if(isLoading) return <Spinner alignSelf="center" size="48px" />

  return (
  <>
    {
      users && users.length > 0
      ? <Box alignSelf="center">
          {
            users.map(user => (
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
        </Box>
      : <p>Sorry, no users :(</p>
    }
    
  </>
  );
}

export default DeleteUser;