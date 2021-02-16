import { Button, Center, HStack, Input, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

function CustomName() {
  const [inputValue, setInputValue] = useState("");
  const [formResponse, setFormResponse] = useState("");
  const [formStatus, setFormStatus] = useState(null);

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
    if (res[0] && res[0].userCustomName) {
      setCustomNameInState(res[0].userCustomName);
    } else {
      setFormResponse("you don't have a custom name currently");
    }
  };

  const setCustomNameHandler = async () => {
    const regex = new RegExp("^[a-zA-Z0-9_-]{2,16}$");
    if (regex.test(inputValue)) {
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
        setFormResponse("Sorry this name is already taken.");
        setFormStatus("error");
      } else {
        let user = inputValue;
        setFormStatus("success");
        await getCustomNameHandler();
        setFormResponse(`Nice, you got it ${user}, check your dashboard!`);
      }
    } else {
      setFormResponse("Between 2-16 characters: A-Z, 0-9,-,_  ");
      setFormStatus("error");
    }
  };

  return (
    <div>
      <Center>
        <HStack>
          <Button onClick={() => setCustomNameHandler()}>
            Set Custom Name
          </Button>
          <Tooltip label={formResponse} isOpen>
            <Input
              isInvalid={formStatus === "error" ? true : false}
              errorBorderColor="red.300"
              bg={formStatus === "success" && "green.100"}
              w="50%"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Tooltip>
        </HStack>
      </Center>
    </div>
  );
}

export default CustomName;
