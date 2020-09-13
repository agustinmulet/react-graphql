import React from 'react';
import {
  Box,
  Spinner,
  useToast
} from "@chakra-ui/core";
import Form from './Form';

import { useMutation, gql } from '@apollo/client';

const ADD_USER = gql`
  mutation addUser ($name: String!, $address: String!, $birthday: String!) {
    addUser(name: $name, address: $address, birthday: $birthday)
    {
      id
      name
      address
      birthday
      posts {
        id
      }
    }
  }
`;

const CreateUser = () => {
  const toast = useToast();

    /**
   * One way to update cache
   *

  const updateCache = (cache, {data}) => {
    // Fetch the users from the cache
    const existingUsers = cache.readQuery({
      query: GET_USERS
    });
    // Add the new user to the cache
    const newUser = data.insert_users_one;
    cache.writeQuery({
      query: GET_USERS,
      data: {users: [newUser, ...existingUsers.users]}
    });
  };
  */

  /**
   * Another way to update cache after a mutation, 
   * from Apollo Docs
   */

  const updateCache = (cache, {data}) => {
    //Modify cache directly with a graphql fragment
    cache.modify({
      fields: {
        users(existingUsers = []) {
          const newUser = cache.writeFragment({
            data: data.addUser,
            fragment: gql`
              fragment NewUser on users {
                id
                name
                address
                birthday
                posts {
                  id
                  title
                  content
                  comments
                }
              }
            `
          });
          return [...existingUsers, newUser];
        }
      }
    });
  }

  const [addNewUser, { loading, error }] = useMutation(ADD_USER, { update: updateCache });

  function handleSubmit(e) {
    e.preventDefault();
    if (
      e.target.name.value && 
      e.target.address.value &&
      e.target.birthday.value
    ) {
      addNewUser({ variables: {
        name: e.target.name.value,
        address: e.target.address.value,
        birthday: e.target.birthday.value
      }});
      if(!loading) {
        toast({
          position: "bottom-left",
          title: "User created.",
          description: "Thanks for using this super secure software.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      e.target.reset();
    } 
  }

  if(loading) return <Spinner alignSelf="center" size="48px" />;
  if(error) {
    toast({
      title: "An error occurred.",
      description: "Unable to create user, check console.",
      status: "error",
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Box alignSelf="center">
      <Form handleSubmit={handleSubmit} />
    </Box>
  );
}

export default CreateUser;