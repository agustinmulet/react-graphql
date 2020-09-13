import React from 'react';
import {
  FormControl,
  FormLabel,
  Button,
  Input
} from "@chakra-ui/core";

const Form = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit} style={{ textAlign: "center" }} >
    <FormControl marginBottom={3}>
      <FormLabel htmlFor="id">id</FormLabel>
      <Input type="id" id="id" name="id" aria-describedby="id-helper-text" />
    </FormControl>
    <FormControl my={3}>
      <FormLabel htmlFor="name">Name</FormLabel>
      <Input type="name" id="name" name="name" aria-describedby="name-helper-text" />
    </FormControl>
    <FormControl my={3}>
      <FormLabel htmlFor="address">Address</FormLabel>
      <Input type="address" id="address" name="address" aria-describedby="address-helper-text" />
    </FormControl>
    <FormControl my={3}>
      <FormLabel htmlFor="birthday">Birthday</FormLabel>
      <Input type="birthday" id="birthday" name="birthday" aria-describedby="birthday-helper-text" />
    </FormControl>
    <Button variantColor="green" type="submit" mt="1.5em" variant="outline">Submit</Button>
  </form>
)

export default Form;