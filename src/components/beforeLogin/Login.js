import React from "react";
import { useEffect } from "react";
import { useStoreActions } from "easy-peasy";

function Login({ setIsLoggedIn }) {
  const getProfile= useStoreActions(actions => actions.getProfile);

  //use effect
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, [ ]);

  return (
    <div>
      <div className="login">
        <button
          onClick={() => (window.location = "http://localhost:8888/login")}
        >
          CLICK HERE TO LOGIN
        </button>
      </div>
    </div>
  );
}

export default Login;
