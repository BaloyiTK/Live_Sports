import React from "react";
import BallBouncingLoader from "./BallBouncingLoader";
import MatchCard from "./MatchCard"; // Import the MatchCard component

const Results = ({ results, loading }) => {

  console.log(results)
  const imageUrl = "https://lsm-static-prod.livescore.com/medium/";

  return (
    <div className="bg-gray-200 w-[100%] rounded-lg md:p-4 shadow-2xl min-h-screen text-sm">
      {loading ? (
        <div className="h-screen flex justify-center items-center text-black">
          <BallBouncingLoader />
        </div>
      ) : (
        results &&
        results.map((match, index) => {
          const relevantEvents = match.Events.filter(
            (event) =>
              event.Eps === "FT" ||
              event.Eps === "AET" ||
              event.Eps === "AP"
          );

          return (
            <div className="w-[100%]" key={index}>
              {relevantEvents.length > 0 && (
                // Use the MatchCard component to render match details
                <MatchCard match={match} />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Results;
