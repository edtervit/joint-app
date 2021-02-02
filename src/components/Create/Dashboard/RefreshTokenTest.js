import { Button } from "@chakra-ui/react";
import { useStoreState, useStoreActions } from "easy-peasy";
import React from "react";

function RefreshTokenTest() {
  //actions
  const refreshTokenAPI = useStoreActions((actions) => actions.refreshTokenAPI);
  //state
  const token = useStoreState((state) => state.token);
  const refreshToken = useStoreState((state) => state.refreshToken);

  const refreshTokenTestHandler = async () => {
    const payload = {
      token: token,
      refreshToken: refreshToken,
    };
    const res = await refreshTokenAPI(payload);
    console.log(res);
  };

  return (
    <div>
      <Button onClick={() => refreshTokenTestHandler()}>
        Refresh token test
      </Button>
    </div>
  );
}

export default RefreshTokenTest;
