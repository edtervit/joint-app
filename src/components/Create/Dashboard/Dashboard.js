import React, { useEffect } from "react";
import AllJoints from "./AllJoints";
import QuickLinks from "./QuickLinks";
import QuickShareLink from "./QuickShareLink";
import { useStoreState } from "easy-peasy";
import ReactGA from "react-ga";

function Dashboard() {
  const profile = useStoreState((state) => state.profile);

  useEffect(() => {
    ReactGA.initialize("G-059VY6T503");

    ReactGA.pageview("/dashboard");
  }, []);

  return (
    <div className="bg-gradient-to-l from-purple-lighter to-orange-light flex flex-col min-h-screen items-center nav-pad">
      <div className="cont max-w-screen-xl">
        <h1 className="title mb-4">
          {profile.customName ? profile.customName : profile.display_name},
          you're done!
        </h1>

        <QuickShareLink />
        <div className="flex flex-wrap md:flex-nowrap justify-center space-x-2">
          <QuickLinks />
          <AllJoints />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
