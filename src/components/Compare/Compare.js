import React from "react";

function Compare({ match }) {
  const trackList1 = match.params.trackList1;
  const trackList2 = match.params.trackList2;

  return (
    <div>
      <h1>Compare page</h1>
      <p>Track List 1: {trackList1}</p>
      <p>Track List 2: {trackList2}</p>
    </div>
  );
}

export default Compare;
