import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

function LandingPage() {
  const history = useHistory();
  const browserState = history.location.state;

  //local state
  let who = null;
  let state = "normal";

  if (browserState) {
    state = browserState.fromShare;
    who = browserState.fromWho;
  }

  //easy actions
  const getProfile = useStoreActions((actions) => actions.getProfile);

  //easy peasyy state
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
        {who && <p>Please login to compare music with {who}!</p>}
        {who &&
          (window.location = `${process.env.REACT_APP_BACK_URL}/login/${state}`)}
        <button
          onClick={() =>
            (window.location = `${process.env.REACT_APP_BACK_URL}/login/${state}`)
          }
        >
          CLICK HERE TO LOGIN
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
