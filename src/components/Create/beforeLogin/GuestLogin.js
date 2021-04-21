import { Center, Input } from "@chakra-ui/react";
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

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      guestLoginHandler();
    }
  };

  return (
    <div className="cont">
      <h1 className="title my-4">Guest Login</h1>
      <Center>
        <Input
          type="password"
          size="sml"
          w="sml"
          placeholder="Enter Password Here"
          p={2}
          color="white"
          my={2}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          isInvalid={pwError ? true : false}
          onKeyPress={handleKeypress}
        ></Input>
      </Center>
      <button className="btn mx-auto my-4" onClick={() => guestLoginHandler()}>
        Login
      </button>
    </div>
  );
}

export default GuestLogin;
