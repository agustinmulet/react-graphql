import React from 'react'
import { Link as RRLink } from "react-router-dom";
import { Icon, Heading, Flex, Box, Stack, Link } from '@chakra-ui/core';

const Home = () => {
  return (
  <>
    <Box alignSelf="center">
      <Stack>
        <Link p={5} as={RRLink} to="/users">
          <Flex p={5} shadow="md" borderWidth="1px" borderRadius={4}>
            <Heading fontSize="lg">Read - All Users</Heading>
            <Icon name="chevron-right" size="24px"/>
          </Flex>
        </Link>
        <Link p={5} as={RRLink} to="/users">
          <Flex p={5} shadow="md" borderWidth="1px" borderRadius={4}>
            <Heading fontSize="lg">Read - Certain User by ID</Heading>
            <Icon name="chevron-right" size="24px"/>
          </Flex>
        </Link>
        <Link p={5} as={RRLink} to="/create">
          <Flex p={5} shadow="md" borderWidth="1px" borderRadius={4}>
            <Heading fontSize="lg">Create - New User</Heading>
            <Icon name="chevron-right" size="24px"/>
          </Flex>
        </Link>
        <Link p={5} as={RRLink} to="/delete">
          <Flex p={5} shadow="md" borderWidth="1px" borderRadius={4}>
            <Heading fontSize="lg">Delete - Certain User by ID</Heading>
            <Icon name="chevron-right" size="24px"/>
          </Flex>
        </Link>
        <Link p={5} as={RRLink} to="">
          <Flex p={5} shadow="md" borderWidth="1px" borderRadius={4}>
            <Heading fontSize="lg"><s>Update - Certain User by ID</s></Heading>
            <Icon name="chevron-right" size="24px"/>
          </Flex>
        </Link>
      </Stack>
    </Box>
  </>
  );
}

export default Home;