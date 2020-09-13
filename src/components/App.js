import React from 'react';
import { useColorMode, Button, Icon, Heading, Flex } from '@chakra-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Home';
import Users from './01-Read-users/Users';
import User from './02-Read-single-user/User';
import CreateUser from './03-Create-user/CreateUser';
import DeleteUser from './04-Delete-user/DeleteUser';

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(process.env.PEPE)
  return (
    <Router>
       <nav>
        <Flex justifyContent="space-around" py={2} h="10vh">
          <Link to="/">
            <Heading as="h1">Apollo GraphQL + React</Heading>
          </Link>
          <Button onClick={toggleColorMode} variant="ghost">
            { 
              colorMode === 'dark' 
              ? <Icon size="2em" name="sun"/> 
              : <Icon size="2em" name="moon" />
            }
          </Button>
        </Flex>
      </nav>
      <Flex justifyContent="space-around" justifyItems="center" alignContent="center" h="90vh" >
        <Switch>
          <Route path="/create">
            <CreateUser />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/delete">
            <DeleteUser />
          </Route>
          <Route path="/user/:id">
            <User />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Flex>
    </Router>
  );
} 

export default App;
