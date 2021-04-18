import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function ListOfTracks(props) {
  const [amount, setAmount] = useState(20);

  const loadMore = () => {
    setAmount(amount + 20);
    console.log("loading more");
  };

  return (
    <div className={`cont black-box mt-4 md:w-500`}>
      {props.TrackList && props.showTotal && (
        <div>
          <h2 className="title mb-4 text-2xl">
            Total songs: {props.TrackList.length}
          </h2>
        </div>
      )}

      <div
        className="max-h-52 md:max-h-96 overflow-y-auto scrollbar transition "
        id="scrollTarget"
      >
        {props.TrackList ? (
          <InfiniteScroll
            dataLength={props.TrackList.slice(0, amount).length}
            next={() => loadMore()}
            hasMore={true}
            scrollableTarget="scrollTarget"
          >
            {props.TrackList.slice(0, amount).map((track) => (
              <div key={track.uri} className="text-left flex items-center my-4">
                <img
                  src={track.image}
                  alt={track.name}
                  className="w-20 md:w-24 mr-4"
                />
                <div className="">
                  <p>{track.artist}</p>
                  <p className="">
                    <strong>{track.name}</strong>
                  </p>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        ) : (
          <div className="">
            <h4>No tracks here.</h4>
            <p>Refresh your page and try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListOfTracks;
