import {
  Box,
  Center,
  Link,
  useClipboard,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import { Link as ReactLink } from "react-router-dom";

function QuickShareLink() {
  //easy peasy state

  const savedTrackLists = useStoreState((state) => state.savedTrackLists);

  useEffect(() => {
    if (savedTrackLists) {
      setClipboardValue(
        `${process.env.REACT_APP_FRONT_URL}/share/${savedTrackLists[0]._id}`
      );
    }
  }, [savedTrackLists]);

  //Save to clipboard
  const [clipboardValue, setClipboardValue] = useState(null);
  const { hasCopied, onCopy } = useClipboard(clipboardValue);

  return (
    <Center>
      {savedTrackLists && (
        <Box
          bg="gray.50"
          w="75%"
          justifyContent="center"
          borderRadius="lg"
          p={5}
          boxShadow="lg"
          my={3}
        >
          <Heading size="md">Your Share Link</Heading>
          <Text>
            Share this link with your friends to invite them to compare and
            create a joint with you!
          </Text>
          <Link
            boxShadow="inner"
            p={3}
            m={3}
            as={ReactLink}
            to={`share/${savedTrackLists[0]._id}`}
            target="_blank"
          >
            {process.env.REACT_APP_FRONT_URL}/share/{savedTrackLists[0]._id}
          </Link>
          <Button ml={3} onClick={onCopy}>
            {hasCopied ? "Copied" : "Copy"}
          </Button>
        </Box>
      )}
    </Center>
  );
}

export default QuickShareLink;