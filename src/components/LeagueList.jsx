import React from "react";
import BallBouncingLoader from "./BallBouncingLoader";

const LeagueList = ({ leagues, searchTerm, handleLeagueClick, loading }) => {
  
  if (!Array.isArray(leagues)) {
    console.error("leagues is not an array:", leagues);
    return null; // or handle this situation appropriately
  }

  const filteredLeagues = leagues.filter((league) =>
    league.Cnm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul className="mt-2">
      {loading ? (
        <div className="h-screen flex justify-center items-center text-black">
          <BallBouncingLoader />
        </div>
      ) :  filteredLeagues.map((league, index) => {
        const truncatedName = league.Cnm.length > 22 ? `${league.Cnm.substring(0, 22)}...` : league.Cnm;
        const imageUrl = `https://static.livescore.com/i2/fh/${league.Ccd}.jpg`;

        return (
          <div
            key={index}
            className="flex items-center cursor-pointer h-fit mb-2 "
            onClick={() => handleLeagueClick(league, index)}
          >
            <div className="w-[10%]">
              <img
                className="w-[20px] h-[10px] rounded-sm"
                src={imageUrl}
                alt={league.Cnm}
              />
            </div>
            <li className="list-none w-[90%] ml-2 overflow-hidden whitespace-nowrap">
              {truncatedName}
            </li>
          </div>
        );
      })}
    </ul>
  );
};

export default LeagueList;
