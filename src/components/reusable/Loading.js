import { Spinner, Text } from "@chakra-ui/react";
import React from "react";

function Loading(props) {
  return (
    <div>
      <h1>Loading</h1>
      <Spinner></Spinner>
      {props.importSongs && (
        <Text>Each 100 songs takes about 1 second so bare with us.</Text>
      )}
    </div>
  );
}

export default Loading;
