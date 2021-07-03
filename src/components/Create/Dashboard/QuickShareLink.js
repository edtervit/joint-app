import { Link, useClipboard } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import { Link as ReactLink } from "react-router-dom";
import { FaCopy } from "react-icons/fa";

function QuickShareLink() {
  //easy peasy state

  const savedTrackLists = useStoreState((state) => state.savedTrackLists);

  const profile = useStoreState((state) => state.profile);

  useEffect(() => {
    if (profile && profile.customName) {
      setClipboardValue(
        `${process.env.REACT_APP_FRONT_URL}/s/${profile.customName}`
      );
    } else if (profile && profile.id) {
      setClipboardValue(`${process.env.REACT_APP_FRONT_URL}/s/${profile.id}`);
    }
  }, [profile]);

  //Save to clipboard
  const [clipboardValue, setClipboardValue] = useState(null);
  const { hasCopied, onCopy } = useClipboard(clipboardValue);

  return (
    <div>
      {savedTrackLists && (
        <div className="my-4">
          <h2 className="text-2xl font-bold">Your Share Link</h2>
          <div className="  bg-black bg-opacity-30 rounded-2xl max-w-max px-4 py-2 text-white flex items-center mt-4 mb-2 mx-auto">
            <Link
              as={ReactLink}
              to={{ pathname: clipboardValue }}
              target="_blank"
            >
              {clipboardValue}
            </Link>
            <div
              onClick={onCopy}
              className={`${
                hasCopied && "bg-green! bg-opacity-80!"
              } cursor-pointer ml-4 border-white border p-2 rounded `}
            >
              <FaCopy />
            </div>
          </div>
          <p>
            Share this link with your friends to invite them to compare music
            with you!
          </p>
        </div>
      )}
    </div>
  );
}

export default QuickShareLink;
