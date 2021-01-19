import React from "react";
import { Center, Box, Heading, Button, Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

function QuickLinks() {
  return (
    <Center>
      <Box
        bg="gray.50"
        w="75%"
        justifyContent="center"
        borderRadius="lg"
        p={5}
        boxShadow="lg"
        my={5}
      >
        <Heading size="md"> Quick links </Heading>
        <Text>
          Check out these links while you wait for your mates to make their
          profile 😴
        </Text>
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          <Button as={ReactLink} to="/playlistmaker" m={2} boxShadow="md">
            Playlist Maker
          </Button>
          <Button as={ReactLink} to="/myprofile" m={2} boxShadow="md">
            View/Edit Your Music Profile
          </Button>
          <Button
            as="a"
            href="https://ko-fi.com/edtervit"
            target="_blank"
            m={2}
            boxShadow="md"
          >
            Donate 🙄
          </Button>
        </Box>
      </Box>
    </Center>
  );
}

export default QuickLinks;
