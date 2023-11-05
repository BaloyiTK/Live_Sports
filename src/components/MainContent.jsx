import React, { useState, useEffect } from "react";
import moment from "moment";
import AllMatches from "./AllMatches";
import { fetchAllMatchesByDate, fetchLiveMatches } from "../api";
import LiveMatches from "./LiveMatches";
import Results from "./Results";
import { useSelector, useDispatch } from "react-redux";
import Table from "./Table";
import CustomDatePicker from "./DatePicker";
import MatchesByLeague from "./LeagueFixture";
import LeagueResults from "./LeagueResults";
import { selectedTabActions } from "../store";

const Tabs = ({ tab, selectedTab, onSelect, resetDate }) => {
  const isActive = selectedTab === tab.id;

  const buttonClasses = `p-1.5 border border-gray-400  font-bold  transition-all duration-300 ease-in-out ${
    isActive
      ? "bg-red-500 text-white  hover:text-white"
      : "bg-gray-200 text-gray-700"
  }`;

  return (
    <button
      onClick={() => {
        onSelect(tab.id);
        resetDate();
      }}
      className={buttonClasses}
    >
      {tab.label}
    </button>
  );
};

const MainContent = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [allMatches, setAllMatches] = useState();
  const [liveMatches, setLiveMatches] = useState();
  const [matchesResults, setMatchesResults] = useState();
  const competitionName = useSelector((state) => state.competitionName.name);
  const selectedTab = useSelector((state) => state.selectedTab);
  const dispatch = useDispatch();

  useEffect(() => {
    if (competitionName) {
      dispatch(selectedTabActions.setSelectedTab("fixture"));
    } else {
      dispatch(selectedTabActions.setSelectedTab("all"));
    }
  }, [competitionName, dispatch]);

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
  } else {
    console.error("Input string is not defined or empty.");
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
            setLoading(true);

            setLoading(true);

            const cachedAllData = localStorage.getItem("allMatches");
            if (cachedAllData) {
              const { Stages } = JSON.parse(cachedAllData);
              setAllMatches(Stages);
              setLoading(false);
            } else {
              matchesData = await fetchAllMatchesByDate(selectedDate);
              setAllMatches(matchesData.Stages);
              localStorage.setItem("allMatches", JSON.stringify(matchesData));
              setLoading(false);
            }
            break;

          case "live":
            setLoading(true);
            const cachedLiveData = localStorage.getItem("liveMatches");
            if (cachedLiveData) {
              setLiveMatches(JSON.parse(cachedLiveData));
              setLoading(false);
            } else {
              matchesData = await fetchLiveMatches();
              setLiveMatches(matchesData);
              localStorage.setItem("liveMatches", JSON.stringify(matchesData));
              setLoading(false);
            }
            break;

          case "results":
            setLoading(true);
            const cachedResultsData = localStorage.getItem("allMatches");

            if (cachedResultsData) {
              const { Stages } = JSON.parse(cachedResultsData);
              setMatchesResults(Stages);
              setLoading(false);
            } else {
              matchesData = await fetchAllMatchesByDate(selectedDate);
              setMatchesResults(matchesData.Stages);
              localStorage.setItem("allMatches", JSON.stringify(matchesData));
              setLoading(false);
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
    dispatch(selectedTabActions.setSelectedTab("all"));
  };

  return (
    <div className="p-2 md:p-4 bg-gray-900 text-white md:mx-1 md:rounded-lg">
      <div className=" bg-gray-800 p-4 text-sm font-semibold rounded ">
        {competitionName && (
          <div className="flex items-center">
            <img
              className="w-[25px] h-[15px] mr-2"
              src={`https://static.livescore.com/i2/fh/${ccdValue}.jpg`}
              alt={"ccd"}
            />
            <div className="grid">
              <span className="text-lg text-white">
                {capitalizeFirstLetter(scdValue)}
              </span>
              <span className="text-sm text-gray-100">
                {capitalizeFirstLetter(ccdValue)}
              </span>
            </div>
          </div>
        )}
        <div className="  flex items-center justify-center">
          <div className="w-[50%] md:w-full flex ">
            {tabs.map((tab) => (
              <span key={tab.id}>
                <Tabs
                  tab={tab}
                  selectedTab={selectedTab}
                  onSelect={() =>
                    dispatch(selectedTabActions.setSelectedTab(tab.id))
                  }
                  resetDate={resetDate}
                />
              </span>
            ))}
          </div>

          <div className="w-[50%] md:w-full">
            {!competitionName && (
              <CustomDatePicker
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
            )}
          </div>
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
                      <AllMatches allMatches={allMatches} loading={loading} />
                    )}
                    {selectedTab === "live" && (
                      <LiveMatches
                        liveMatches={liveMatches}
                        loading={loading}
                      />
                    )}
                    {selectedTab === "results" && (
                      <Results results={matchesResults} loading={loading} />
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
