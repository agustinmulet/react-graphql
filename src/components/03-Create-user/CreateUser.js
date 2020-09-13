import React, { useState } from 'react';
import {
  Box,
  Spinner,
  useToast
} from "@chakra-ui/core";
import Form from './Form';

const wait = (cb) => (setTimeout(cb, 2000));

const CreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    if (
      e.target.id.value &&
      e.target.name.value && 
      e.target.address.value &&
      e.target.birthday.value
    ) {
      setIsLoading(true);
      fetch(`${process.env.SERVER_URL}/users`,{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          id: e.target.id.value,
          name: e.target.name.value,
          address: e.target.address.value,
          birthday: e.target.birthday.value,
          posts: []
        })
      })
      .then(data => data.json())
      .then(() => {
        wait(() => {
          toast({
            position: "bottom-left",
            title: "User created.",
            description: "Thanks for using this super secure software.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
        });
      })
      .catch(err => {
        toast({
          title: "An error occurred.",
          description: "Unable to create user, check console.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
        console.error(err);
      });
      e.target.reset();
    } 
  }

  if(isLoading) return <Spinner alignSelf="center" size="48px" />;

  return (
    <Box alignSelf="center">
      <Form handleSubmit={handleSubmit} />
    </Box>
  );
}

export default CreateUser;