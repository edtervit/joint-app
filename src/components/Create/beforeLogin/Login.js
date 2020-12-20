import React from "react";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import queryString from "query-string";

function Login() {
  const getProfile = useStoreActions((actions) => actions.getProfile);
  const failedCookie = useStoreState((state) => state.failedCookie);
  //use effect
  useEffect(() => {
    if (!failedCookie) {
      let token = queryString.parse(window.location.search);
      if (Object.entries(token).length !== 0) {
        getProfile();
      }
    }
    // eslint-disable-next-line
  }, [failedCookie]);

  return (
    <div>
      <div className="login">
        {failedCookie && (
          <div className="failedCookie">
            <p>
              Sorry your request to Spotify failed, try login again to get a new
              cookie 🍪
            </p>
          </div>
        )}
        <button
          onClick={() =>
            (window.location = `${process.env.REACT_APP_BACK_URL}/login`)
          }
        >
          CLICK HERE TO LOGIN
        </button>
      </div>
    </div>
  );
}

export default Login;
