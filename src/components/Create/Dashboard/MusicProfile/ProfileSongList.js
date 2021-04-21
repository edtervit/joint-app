import React from "react";
import { useStoreState } from "easy-peasy";

import ListOfTracks from "../../../reusable/ListOfTracks";

function ProfileSongList() {
  const savedTrackLists = useStoreState((state) => state.savedTrackLists);

  return (
    <div>
      {savedTrackLists && (
        <div>
          {savedTrackLists[0].theList && (
            <div>
              <ListOfTracks TrackList={savedTrackLists[0].theList} showTotal />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileSongList;
