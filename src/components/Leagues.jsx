import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { competitionNameActions } from "../store";
import LeagueList from "./LeagueList";
import Competitions from "./Competitions";
import SearchBar from "./SearchBar";

const Leagues = ({ leagues }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [countryFlag, setCountryFlag] = useState("");
  const [queriedLeague, setQueriedLeague] = useState("");
  const [competitionStringId, setCompetitionStringId] = useState("");
  const [ccd, setCcd] = useState("");
  const dispatch = useDispatch();

  const handleClear = () => {
    setSearchTerm("");
  };

  const handleBack = () => {
    setSelectedLeague("");
    setSearchTerm(queriedLeague); // Update the search term to the selected competition
    setQueriedLeague("");
    dispatch(competitionNameActions.setCompetitionName());
  };

  const handleLeagueClick = (league, index) => {
    setSearchTerm(league.Cnm); // Update the search term to the selected league
    setCountryFlag(league.Ccd);
    setSelectedLeague(league.Stages);
    setCcd(league.Ccd);
  };

  dispatch(competitionNameActions.setCompetitionName(competitionStringId));

  console.log(competitionStringId);

  const handleCompetitionClick = (competition) => {
    console.log(competition);
    const ccdStr = (
      competition.CompST ||
      competition.CompN ||
      ""
    ).toLowerCase();
    setCompetitionStringId(`Ccd=${ccd.toLowerCase()}&Scd=${competition.Scd}`);
    setSearchTerm(competition.CompN); // Set search term to the selected competition
  };

  return (
    <div className="hidden md:block min-h-screen mx-auto p-4 bg-gray-900 rounded-md shadow-2xl text-white text-sm">
      <h3 className="font-bold pb-2">Leagues</h3>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleClear={handleClear}
        handleBack={handleBack}
        isBackVisible={selectedLeague !== ""}
      />

      {selectedLeague ? (
        <Competitions
          selectedLeague={selectedLeague}
          handleCompetitionClick={handleCompetitionClick}
          countryFlag={countryFlag}
        />
      ) : (
        <LeagueList
          leagues={leagues}
          searchTerm={searchTerm}
          handleLeagueClick={handleLeagueClick}
        />
      )}
    </div>
  );
};

export default Leagues;
