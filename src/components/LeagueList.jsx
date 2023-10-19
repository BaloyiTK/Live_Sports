import React from "react";

const LeagueList = ({ leagues, searchTerm, handleLeagueClick }) => {

  //console.log('Type of leagues:', typeof leagues);

  console.log(leagues)

  const filteredLeagues =
    leagues &&
    leagues.filter((league) =>
      league.Cnm.toLowerCase().includes(searchTerm.toLowerCase())
    );

  console.log(leagues)

  return (
    <ul className="mt-2">
      {filteredLeagues &&
        filteredLeagues.map((league, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer h-fit mb-2 "
            onClick={() => handleLeagueClick(league, index)}
          >
            <div className="w-[10%]">
              <img
                className="w-[20px] h-[10px] rounded-sm"
                src={`https://static.livescore.com/i2/fh/${league.Ccd}.jpg`}
                alt={league.Cnm}
              />
            </div>
            <li className="list-none w-[90%] ml-2 overflow-hidden whitespace-nowrap">
              {league.Cnm.length > 22
                ? `${league.Cnm.substring(0, 22)}...`
                : league.Cnm}
            </li>
          </div>
        ))}
    </ul>
  );
};

export default LeagueList;
