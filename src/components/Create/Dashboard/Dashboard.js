import React from "react";
import AllJoints from "./AllJoints";
import QuickLinks from "./QuickLinks";
import QuickShareLink from "./QuickShareLink";
import { useStoreState } from "easy-peasy";

function Dashboard() {
  const profile = useStoreState((state) => state.profile);

  return (
    <div className="bg-gradient-to-l from-purple-lighter to-orange-light flex flex-col min-h-screen items-center nav-pad">
      <div className="cont">
        <h1 className="title mb-8">
          {profile.customName ? profile.customName : profile.display_name},
          you're done!
        </h1>
        <QuickShareLink />
        <QuickLinks />
        <AllJoints />
      </div>
    </div>
  );
}

export default Dashboard;
