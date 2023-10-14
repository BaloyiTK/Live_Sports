import React, { useState, useEffect } from "react";
import { IoIosSearch, IoIosClose, IoIosArrowBack } from "react-icons/io";

import { useSelector, useDispatch } from "react-redux";
import { competitionNameActions } from "../store";

const Leagues = ({ leagues }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeague, setSelectedLeague] = useState();
  const [countryFlag, setCountryFlag] = useState();
  const [leagueIndex, setLeagueIndex] = useState("");
  // const [competitionSelected, setCompetitionSelected] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState();
  const [queriedLeague, setQueriedLeague] = useState("");
  const [competitionName, setCompetitionName] = useState("");
  const [competitionStringId, setCompetitionStringId] = useState("");
  const [ccd, setCcd] = useState();

  console.log(selectedCompetition);

  const dispatch = useDispatch();

  console.log(competitionName && competitionName.Scd);

  //Ccd=england&Scd=premier-league

  useEffect(() => {
    try {
      dispatch(competitionNameActions.setCompetitionName(competitionStringId));
    } catch (error) {
      console.log(error);
    }
  }, [competitionName]);

  // Function to handle the click event on a league
  const handleLeagueClick = (league, index) => {
    console.log(league);
    setQueriedLeague(league.Cnm);
    setCountryFlag(league.Ccd);
    setSelectedLeague(league.Stages);
    setLeagueIndex(index);
    setCcd(league.Ccd);
  };

  // Function to filter leagues by search term
  const filterLeagues = () => {
    return (
      leagues &&
      leagues.filter((league) =>
        league.Cnm.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  // Display a list of leagues based on the filtered result
  const renderLeagueList = () => {
    const filteredLeagues = filterLeagues();

    return (
      <ul>
        {filteredLeagues &&
          filteredLeagues.map((league, index) => (
            <div
              key={index}
              className="flex items-center cursor-pointer h-fit m-1"
              onClick={() => handleLeagueClick(league, index)}
            >
              <div className="w-[10%]">
                <img
                  className="w-[20px] h-[10px] rounded-sm"
                  src={`https://static.livescore.com/i2/fh/${league.Ccd}.jpg`}
                  alt={league.Cnm}
                />
              </div>

              <li className="list-none w-[90%] overflow-hidden whitespace-nowrap  md:text-lg">
                {league.Cnm.length > 18
                  ? `${league.Cnm.substring(0, 18)}...`
                  : league.Cnm}
              </li>
            </div>
          ))}
      </ul>
    );
  };

  // Display competitions for the selected league
  const renderCompetitions = () => {
    // Use a Set to store unique competition names
    const uniqueCompetitionNames = new Set();

    const handleCompetitionClick = (competition) => {
      setSelectedCompetition(competition);
      setCompetitionName(competition.Sdn);
      setLeagueIndex(leagues[leagueIndex]); // Make sure this is correct
      const ccdStr = (
        competition.CompST ||
        competition.CompN ||
        ""
      ).toLowerCase();

      const modifiedStr = ccdStr.replace(/\s/g, "-");
      setCompetitionStringId(`Ccd=${ccd.toLowerCase()}&Scd=${competition.Scd}`);
    };

    return (
      <div>
        {selectedLeague?.map((competition, index) => {
          // Check if the competition name is unique before rendering
          if (!uniqueCompetitionNames.has(competition.Sdn)) {
            uniqueCompetitionNames.add(competition.Sdn);
            if (competition.Shi === 0) {
              return (
                <div
                  className="flex items-center cursor-pointer"
                  key={index}
                  onClick={() => handleCompetitionClick(competition)}
                >
                  <div className="w-[15%]">
                    <img
                      className="w-[20px] h-[10px] m-1 rounded-sm"
                      src={`https://static.livescore.com/i2/fh/${countryFlag}.jpg`}
                      alt={competition.Sdn}
                    />
                  </div>

                  <li className="list-none w-[80%] overflow-hidden whitespace-nowrap">
                    {competition.Sdn}
                  </li>
                </div>
              );
            }
          }
          return null; // Skip rendering if it's a duplicate
        })}
      </div>
    );
  };

  return (
    <div className="hidden md:block min-h-screen  mx-auto p-4 bg-gray-800 rounded-md shadow-2xl text-white text">
      <h3 className="font-bold pb-2">Leagues</h3>

      {/* Search bar */}
      <div className="relative ">
        {selectedLeague ? (
          // Back button
          <div
            className="absolute inset-y-0 left-2 flex items-center  cursor-pointer font-bold text-black"
            onClick={() => {
              setSelectedLeague(false);
              setQueriedLeague("");
              dispatch(competitionNameActions.setCompetitionName());
            }}
          >
            <IoIosArrowBack className="text-xl font-extrabold text-black" />
          </div>
        ) : (
          // Search icon
          <div className="absolute inset-y-0 left-2 flex items-center pl- text-gray-600">
            <IoIosSearch className="text-xl" />
          </div>
        )}
        <input
          type="text"
          placeholder="Search leagues..."
          value={queriedLeague || searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="py-1 pl-8  text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        {!selectedLeague && searchTerm.length > 0 && (
          <div
            className="absolute inset-y-0 right-12 flex items-center  text-white cursor-pointer"
            onClick={handleClear}
          >
            <IoIosClose className="text-3xl font-extrabold text-black" />
          </div>
        )}
      </div>

      {selectedLeague ? renderCompetitions() : renderLeagueList()}
    </div>
  );
};

export default Leagues;
