import { Button, Center, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";

function GuestLogin() {
  const guestTokenAPI = useStoreActions((actions) => actions.guestTokenAPI);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const history = useHistory();

  const guestLoginHandler = async () => {
    const token = await guestTokenAPI(pw);
    if (token && token.access_token) {
      setPwError(false);
      history.push(`/?access_token=${token.access_token}`);
    } else {
      setPwError(true);
      console.log("wrong pw");
    }
  };

  return (
    <div>
      <Button onClick={() => guestLoginHandler()}>Guest Login</Button>
      <Center>
        <Input
          type="password"
          size="sml"
          w="sml"
          my={2}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          isInvalid={pwError ? true : false}
        ></Input>
      </Center>
    </div>
  );
}

export default GuestLogin;
