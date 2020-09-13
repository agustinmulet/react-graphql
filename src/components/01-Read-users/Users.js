import React, { useState, useEffect } from 'react'
import { Box, Spinner } from '@chakra-ui/core';
import UserItem from './UserItem';

const wait = (cb) => (setTimeout(cb, 2000));

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.SERVER_URL}/users`)
      .then(data => data.json())
      .then(data => {
        wait(() => {
          setUsers(data);
          setIsLoading(false);
        })
      })
      .catch(err => console.log(err));
  }, []);

  if(isLoading) return <Spinner alignSelf="center" size="48px" />;
  if(!users) return <p>Sorry, no users :(</p>;

  return (
    <Box alignSelf="center">
      {
        users.map(user => <UserItem key={user.id} user={user} />)
      }
    </Box>
  );
}

export default Users;