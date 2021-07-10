import React from "react";
import Wrapped from "../../Wrapped/Wrapped";

function AlwaysWrapped() {
  return (
    <div className="bg-gradient-to-l from-purple-lighter to-orange-light flex flex-col min-h-screen items-center nav-pad">
      <div className="cont">
        <h1 className="title mb-4">Always Wrapped.</h1>
        <p className="mb-4">Your spotify wrapped, whenever you want.</p>
        <Wrapped length={"short"} />
        <Wrapped length={"medium"} />
        <Wrapped length={"long"} />
      </div>
    </div>
  );
}

export default AlwaysWrapped;
