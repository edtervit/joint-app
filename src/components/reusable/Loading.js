import { Spinner, Text } from "@chakra-ui/react";
import React from "react";

function Loading() {
  return (
    <div>
      <h1>Loading</h1>
      <Spinner></Spinner>
      <Text>Each 100 songs takes about 1 second so bare with us.</Text>
    </div>
  );
}

export default Loading;
