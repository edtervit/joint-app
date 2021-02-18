import { Button, Center, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";

function GuestLogin() {
  const guestTokenAPI = useStoreActions((actions) => actions.guestTokenAPI);
  const [pw, setPw] = useState("");

  const guestLoginHandler = async () => {
    const token = await guestTokenAPI(pw);
    console.log(token);
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
        ></Input>
      </Center>
    </div>
  );
}

export default GuestLogin;
