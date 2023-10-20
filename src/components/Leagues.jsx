import React, { useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { competitionNameActions } from "../store";
import LeagueList from "./LeagueList";
import Competitions from "./Competitions";
import SearchBar from "./SearchBar";

const Leagues = ({ leagues }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeagueData, setSelectedLeagueData] = useState({
    name: "",
    countryFlag: "",
    ccd: "",
  });
  const dispatch = useDispatch();

  const handleClear = useCallback(() => {
    setSearchTerm("");
  }, []);

  const handleBack = useCallback(() => {
    setSearchTerm("");
    setSelectedLeagueData({ name: "", countryFlag: "", ccd: "" });
    dispatch(competitionNameActions.setCompetitionName(""));
  }, [dispatch]);

  const handleLeagueClick = useCallback((league) => {
    setSearchTerm(league.Cnm);
    setSelectedLeagueData({
      name: league.Stages,
      countryFlag: league.Ccd,
      ccd: league.Ccd,
    });
  }, []);

  const handleCompetitionClick = useCallback((competition) => {
    const competitionStringId = `Ccd=${selectedLeagueData.ccd.toLowerCase()}&Scd=${competition.Scd}`;
    setSearchTerm(competition.CompN);
    dispatch(competitionNameActions.setCompetitionName(competitionStringId));
  }, [dispatch, selectedLeagueData]);

  const selectedLeague = selectedLeagueData.name;
  const countryFlag = selectedLeagueData.countryFlag;

  return (
    <div className="min-h-screen mx-auto p-4 bg-gray-900 rounded-md shadow-2xl text-white text-sm">
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
