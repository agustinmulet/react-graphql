import React from 'react';
import { Link as RRLink } from "react-router-dom";
import { Heading, Flex, Stack, Link, Icon } from "@chakra-ui/core";

function UserItem({ user }) {
  return (
    <Stack>
      <Link p={5} as={RRLink} to={`/user/${user.id}`}>
        <Flex p={5} shadow="md" borderWidth="1px" borderRadius={4}>
          <Heading fontSize="lg">{user.name}</Heading>
          <Icon name="chevron-right" size="24px"/>
        </Flex>
      </Link>
    </Stack>
  );
}

export default UserItem;