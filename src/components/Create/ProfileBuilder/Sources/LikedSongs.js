import {
  Box,
  Center,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

function LikedSongs() {
  const [radioValue, setRadioValue] = useState("nah");

  //actions
  const setGotLikedSongs = useStoreActions(
    (actions) => actions.setGotLikedSongs
  );
  const setNoLikedSongsSelected = useStoreActions(
    (actions) => actions.setNoLikedSongsSelected
  );

  const callAPI = useStoreActions((actions) => actions.callAPI);

  // estate

  //handlers
  const getTheDataHandler = () => {
    if (radioValue === "nah") {
      setGotLikedSongs(true);
    } else {
      // once job is complete set this to true
      setGotLikedSongs(true);
    }
  };

  //when is getting data is true, run the code to get the data
  const isGettingData = useStoreState((state) => state.isGettingData);
  useEffect(() => {
    if (isGettingData) {
      getTheDataHandler();
    }
    // eslint-disable-next-line
  }, [isGettingData]);

  //Checks to see if nah is ticked
  useEffect(() => {
    if (radioValue !== "nah") {
      setNoLikedSongsSelected(false);
    } else {
      setNoLikedSongsSelected(true);
    }
    return () => {};
    // eslint-disable-next-line
  }, [radioValue]);

  return (
    <div>
      <Box my={3} display="flex" flexDirection="column">
        <Heading size="sml">Liked Songs</Heading>
        <p>Radio value: {radioValue}</p>
        <RadioGroup
          name="liked-songs"
          defaultValue="nah"
          onChange={(value) => setRadioValue(value)}
        >
          <Center>
            <Stack spacing={4} direction="row" center>
              <Radio value="nah">Nah</Radio>
              <Radio value="200">200 Most recent</Radio>
              <Radio value="500">500 Most recent</Radio>
              <Radio value="all">All liked songs</Radio>
            </Stack>
          </Center>
        </RadioGroup>
      </Box>
    </div>
  );
}

export default LikedSongs;
