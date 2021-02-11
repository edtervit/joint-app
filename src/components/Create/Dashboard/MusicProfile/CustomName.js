import { Button, Center, HStack, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

function CustomName() {
  const [customName, setCustomName] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [nameGood, setNameGood] = useState("");

  const postDB = useStoreActions((actions) => actions.postDB);
  const callDB = useStoreActions((actions) => actions.callDB);
  const setCustomNameInState = useStoreActions(
    (actions) => actions.setCustomName
  );

  const myprofile = useStoreState((state) => state.profile);

  const getCustomNameHandler = async () => {
    const payload = {
      url: `/profile/getByID/${myprofile.id}`,
      method: "GET",
    };
    const res = await callDB(payload);
    console.log(res);
    if (res[0] && res[0].userCustomName) {
      setCustomName(res[0].userCustomName);
      setCustomNameInState(res[0].userCustomName);
    } else {
      setCustomName("you don't have a custom name currently");
    }
  };

  const setCustomNameHandler = async () => {
    const payload = {
      body: {
        userProfileID: myprofile.id,
        userCustomName: inputValue,
      },
      url: `/profile/create`,
      method: "POST",
    };
    const res = await postDB(payload);
    console.log(res);
    if (!res.ok) {
      setNameGood("taken");
    } else {
      setNameGood("nice");
    }
  };
  return (
    <div>
      <Center>
        <HStack>
          <Button onClick={() => setCustomNameHandler()}>
            Set Custom Name
          </Button>
          <Input
            isInvalid={nameGood === "taken" ? true : false}
            errorBorderColor="red.300"
            w="50%"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </HStack>
      </Center>
      {nameGood === "taken" && (
        <Text my={3}>Looks like this name is taken! Soz boz</Text>
      )}
      {nameGood === "nice" && (
        <Text my={3}>You got it! Check your dashboard for the update</Text>
      )}
      <Center>
        <HStack>
          <Button onClick={() => getCustomNameHandler()}>
            Get Custom Name
          </Button>
          <p>Custom name: {customName && customName}</p>
        </HStack>
      </Center>
    </div>
  );
}

export default CustomName;
