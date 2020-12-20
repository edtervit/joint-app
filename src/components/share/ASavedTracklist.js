import React from "react";

function ASavedTracklist({ match }) {
  const params = match.params.trackListID;
  return (
    <div>
      <h1>{params}</h1>
      <p></p>
      <img src={`https://picsum.photos/seed/${params}/600`} alt="" />
    </div>
  );
}

export default ASavedTracklist;
