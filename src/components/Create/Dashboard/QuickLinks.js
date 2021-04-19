import React from "react";
import { Link as ReactLink } from "react-router-dom";

function QuickLinks() {
  return (
    <div className="black-box flex flex-col  items-center justify-center">
      <h2 className="title text-2xl "> Quick links </h2>
      <p>
        Check out these links while you wait for your mates to make their
        profile
      </p>
      <div className="text-white flex flex-col items-center space-y-4 my-4">
        <ReactLink
          to="/playlistmaker"
          className="btn bg-black bg-opacity-30 w-full max-w-full"
        >
          Playlist Maker
        </ReactLink>
        <ReactLink
          to="/myprofile"
          className="btn bg-black bg-opacity-30 w-full max-w-full"
        >
          View/Edit Your Music Profile
        </ReactLink>
        <a
          href="https://ko-fi.com/edtervit"
          target="_blank"
          rel="noreferrer"
          className="btn w-full max-w-full"
        >
          Donate ❤
        </a>
      </div>
    </div>
  );
}

export default QuickLinks;
