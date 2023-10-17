import React, { useState, useEffect } from "react";
import moment from "moment";
import AllMatches from "./AllMatches";
import { fetchAllMatchesByDate, fetchLiveMatches } from "../api";
import LiveMatches from "./LiveMatches";
import Results from "./Results";
import { useSelector } from "react-redux";
import Table from "./Table";
import CustomDatePicker from "./DatePicker"; // Import the DatePicker component
import Tabs from "./Tabs";
import MatchesByLeague from "./LeagueFixture";
import LeagueResults from "./LeagueResults";

const MainContent = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allMatches, setAllMatches] = useState();
  const [liveMatches, setLiveMatches] = useState();
  const [matchesResults, setMatchesResults] = useState();
  const competitionName = useSelector((state) => state.competitionName.name);
  const [selectedTab, setSelectedTab] = useState(
    competitionName !== "" ? "fixture" : "all"
  );

  console.log(allMatches);

  console.log(selectedTab);

  // Your string containing "Ccd" and "Scd"
  const inputString = competitionName;
  let ccdValue, scdValue;
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  // Check if inputString is defined and not empty
  if (inputString) {
    // Split the string by the '&' character
    const keyValuePairs = inputString.split("&");

    for (const pair of keyValuePairs) {
      const [key, value] = pair.split("=");
      if (key === "Ccd") {
        ccdValue = value;
      } else if (key === "Scd") {
        scdValue = value;
      }
    }

    // Check if both values have been found
    if (ccdValue && scdValue) {
      console.log("Ccd:", capitalizeFirstLetter(ccdValue)); // Output: England
      console.log("Scd:", capitalizeFirstLetter(scdValue)); // Output: Premier-league
    } else {
      console.log("Values not found in the string.");
    }
  } else {
    console.log("Input string is not defined or empty.");
  }

  const tabs = competitionName
    ? [
        { id: "fixture", label: "Fixture" },
        { id: "table", label: "Table" },
        { id: "results", label: "Results" },
      ]
    : [
        { id: "all", label: "All" },
        { id: "live", label: "Live" },
        { id: "results", label: "Results" },
      ];

  const resetDate = () => {
    setSelectedDate(new Date());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let matchesData;

        const cachedDate = localStorage.getItem("selectedDate");

        const date = moment(selectedDate);
        const dateCached = moment(cachedDate);

        const formatedCachedDate = dateCached.format("YYYY-MM-DD");
        const formattedDate = date.format("YYYY-MM-DD");

        if (formattedDate !== formatedCachedDate) {
          localStorage.removeItem("allMatches");
          localStorage.removeItem("liveMatches");
          localStorage.removeItem("matchesResults");
          localStorage.removeItem("table");
          localStorage.setItem("selectedDate", selectedDate);
        }

        switch (selectedTab) {
          case "all":
            const cachedAllData = localStorage.getItem("allMatchess");
            if (cachedAllData) {
              const { Stages } = JSON.parse(cachedAllData);
              setAllMatches(Stages);
            } else {
              matchesData = await fetchAllMatchesByDate(selectedDate);
              setAllMatches(matchesData.Stages);
              localStorage.setItem("allMatches", JSON.stringify(matchesData));
            }
            break;

          case "live":
            const cachedLiveData = localStorage.getItem("liveMatchess");
            if (cachedLiveData) {
              setLiveMatches(JSON.parse(cachedLiveData));
            } else {
              matchesData = await fetchLiveMatches();
              setLiveMatches(matchesData);
              localStorage.setItem("liveMatches", JSON.stringify(matchesData));
            }
            break;

          case "results":
            const cachedResultsData = localStorage.getItem("allMatches");
            if (cachedResultsData) {
              const { Stages } = JSON.parse(cachedResultsData);
              setMatchesResults(Stages);
            } else {
              matchesData = await fetchAllMatchesByDate(selectedDate);
              setMatchesResults(matchesData.Stages);
              localStorage.setItem("allMatches", JSON.stringify(matchesData));
            }
            break;

          default:
            break;
        }
      } catch (error) {
        // Handle the error appropriately
      }
    };

    fetchData();
  }, [selectedTab, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div className="p-2 md:p-4  bg-gray-900 text-white md:mx-1 md:rounded-lg">
      <div className=" bg-gray-700 p-2 text-sm font-semibold">
        {competitionName && (
          <div className="flex items-center p-">
            <img
              className="w-[25px] h-[15px] rounded-sm m-2"
              src={`https://static.livescore.com/i2/fh/${ccdValue}.jpg`}
              alt={"ccd"}
            />
            <div className="grid">
              <span className="text-lg text-gray-100">
                {capitalizeFirstLetter(scdValue)}
              </span>
              <span className="text-sm text-gray-300">
                {capitalizeFirstLetter(ccdValue)}
              </span>
            </div>
          </div>
        )}
        <div className="w-full flex items-center">
          {tabs.map((tab) => (
            <span
              className="m-1  hover:text-white"
              key={tab.id}
            >
              <Tabs
                tab={tab}
                selectedTab={selectedTab}
                onSelect={setSelectedTab}
                resetDate={resetDate}
              />
            </span>
          ))}
          {/* Use the CustomDatePicker component here */}

          {!competitionName && (
            <CustomDatePicker
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
            />
          )}
        </div>
      </div>

      <div className="mt-4 mx-auto">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          {competitionName ? (
            selectedTab === "table" ? (
              <Table />
            ) : selectedTab === "fixture" ? (
              <MatchesByLeague
                competitionCountry={ccdValue}
                competitionLeague={scdValue}
              />
            ) : (
              <LeagueResults
              competitionCountry={ccdValue}
              competitionLeague={scdValue}
            />
            )
          ) : (
            tabs.map((tab) => {
              if (selectedTab === tab.id) {
                return (
                  <div key={tab.id}>
                    {selectedTab === "all" && (
                      <AllMatches allMatches={allMatches} />
                    )}
                    {selectedTab === "live" && (
                      <LiveMatches liveMatches={liveMatches} />
                    )}
                    {selectedTab === "results" && (
                      <Results results={matchesResults} />
                    )}
                  </div>
                );
              }
              return null;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
