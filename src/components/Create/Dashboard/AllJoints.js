import React from "react";
import YourJoints from "./AllJoints/YourJoints";
import OthersJoints from "./AllJoints/OthersJoints";

function AllJoints() {
  return (
    <div className="black-box ">
      <div className=" md:max-h-72 overflow-y-auto scrollbar">
        <YourJoints />
        <OthersJoints />
      </div>
    </div>
  );
}

export default AllJoints;
